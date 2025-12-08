import React, { useState, useEffect } from "react";

const TransportForm = ({ onAdd, onUpdate, editing, vehicles, drivers, isDriverBusy, isVehicleBusy, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    driver: "",
    vehicle: "",
    pickup: "",
    destination: "",
    status: "planowany",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setFormData(editing);
    } else {
      setFormData({
        driver: "",
        vehicle: "",
        pickup: "",
        destination: "",
        status: "planowany",
      });
    }
  }, [editing]);

  const validate = () => {
    if (isDriverBusy(formData.driver) && formData.status !== "zakończony") {
      return "Ten kierowca ma aktywny transport.";
    }
    if (isVehicleBusy(formData.vehicle) && formData.status !== "zakończony") {
      return "Ten pojazd jest już w użyciu.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");

    if (editing) onUpdate(formData);
    else onAdd(formData);

    setFormData({
      driver: "",
      vehicle: "",
      pickup: "",
      destination: "",
      status: "planowany",
    });
  };

  return (
    <form className="transport-form" onSubmit={handleSubmit}>
      <h3>{editing ? "Edytuj transport" : "Dodaj transport"}</h3>

      {error && <p className="error">{error}</p>}

      <select
        value={formData.driver}
        onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
        required
      >
        <option value="">Wybierz kierowcę</option>
        {drivers.map((d) => (
          <option key={d.id || d._id} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>

      <select
        value={formData.vehicle}
        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
        required
      >
        <option value="">Wybierz pojazd</option>
        {vehicles.map((v) => (
          <option key={v.id || v._id} value={v.name}>
            {v.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Miejsce odbioru"
        value={formData.pickup}
        onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Miejsce docelowe"
        value={formData.destination}
        onChange={(e) =>
          setFormData({ ...formData, destination: e.target.value })
        }
        required
      />

      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      >
        <option value="planowany">Planowany</option>
        <option value="w trakcie">W trakcie</option>
        <option value="zakończony">Zakończony</option>
      </select>

      <div className="action-buttons">
        <button type="submit">
          {editing ? "Zapisz zmiany" : "Dodaj transport"}
        </button>

        <button type="button" onClick={onCancelEdit} className="cancel">
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default TransportForm;