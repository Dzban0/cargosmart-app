import React, { useState, useEffect } from "react";

const TransportForm = ({ onAdd, onUpdate, editing, vehicles, drivers, isDriverBusy, isVehicleBusy }) => {
  const [formData, setFormData] = useState({
    driver: "",
    vehicle: "",
    route: "",
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
        route: "",
        status: "planowany",
      });
    }
  }, [editing]);

  const transportValidate = () => {
    if (isDriverBusy(formData.driver) && formData.status !== "zakończony") {
      return "Wybrany kierowca jest już w trasie.";
    }
    if (isVehicleBusy(formData.vehicle) && formData.status !== "zakończony") {
      return "Wybrany pojazd jest już w trasie.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = transportValidate();
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
      route: "",
      status: "planowany",
    });
  };

  console.log("Filtered drivers: ", drivers.filter((d) => !isDriverBusy(d.name))); // Logowanie dostępnych kierowców
  console.log("Filtered vehicles: ", vehicles.filter((v) => !isVehicleBusy(v.name))); // Logowanie dostępnych pojazdów

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
        {drivers
          .filter((d) => !isDriverBusy(d.name)) // Filtrowanie dostępnych kierowców
          .map((d) => (
            <option key={d.id} value={d.name}>
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
        {vehicles
          .filter((v) => !isVehicleBusy(v.name)) // Filtrowanie dostępnych pojazdów
          .map((v) => (
            <option key={v.id} value={v.name}>
              {v.name}
            </option>
          ))}
      </select>

      <input
        type="text"
        placeholder="Trasa"
        value={formData.route}
        onChange={(e) => setFormData({ ...formData, route: e.target.value })}
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
      </div>
    </form>
  );
};

export default TransportForm;