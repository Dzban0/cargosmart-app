import React, { useEffect, useState } from "react";

const TransportForm = ({ editing, onAdd, onUpdate, onCancelEdit, drivers, vehicles, isDriverBusy, isVehicleBusy }) => {

  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    driver: "",
    vehicle: "",
    status: "planowany"
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setFormData({
        _id: editing._id,
        pickup: editing.pickup,
        destination: editing.destination,
        driver: editing.driver?._id || "",
        vehicle: editing.vehicle?._id || "",
        status: editing.status
      });
    }
  }, [editing]);

  const validate = () => {
    if (formData.driver && isDriverBusy(formData.driver)) {
      return "Kierowca jest zajęty";
    }
    if (formData.vehicle && isVehicleBusy(formData.vehicle)) {
      return "Pojazd jest zajęty";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const err = validate();
    if (err) return setError(err);

    const payload = {
      ...formData,
      driver: formData.driver || null,
      vehicle: formData.vehicle || null,
    };

    editing ? onUpdate(payload) : onAdd(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="transport-form">
      <h3>{editing ? "Edytuj transport" : "Dodaj transport"}</h3>

      {error && <p className="error">{error}</p>}

      <input
        required
        placeholder="Odbiór"
        value={formData.pickup}
        onChange={e => setFormData({ ...formData, pickup: e.target.value })}
      />

      <input
        required
        placeholder="Cel"
        value={formData.destination}
        onChange={e => setFormData({ ...formData, destination: e.target.value })}
      />

      <select
        value={formData.driver}
        onChange={e => setFormData({ ...formData, driver: e.target.value })}
      >
        <option value="">Wybierz kierowcę</option>
        {drivers
          .filter(worker => worker.position === "Kierowca")
          .map(worker => (
          <option key={worker._id} value={worker._id}>
            {worker.firstName} {worker.lastName}
          </option>
        ))}
      </select>

      <select
        value={formData.vehicle}
        onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
      >
        <option value="">Wybierz pojazd</option>
        {vehicles.map(v => (
          <option key={v._id} value={v._id}>
            {v.name}, ({v.registration})
          </option>
        ))}
      </select>

      <select
        value={formData.status}
        onChange={e => setFormData({ ...formData, status: e.target.value })}
      >
        <option value="planowany">Planowany</option>
        <option value="w trakcie">W trakcie</option>
        <option value="zakończony">Zakończony</option>
      </select>

      <button type="submit">{editing ? "Zapisz" : "Dodaj"}</button>
      <button type="button" onClick={onCancelEdit}>Anuluj</button>
    </form>
  );
};

export default TransportForm;