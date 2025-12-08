import React, { useState, useEffect } from "react";
import TransportList from "./TransportList";
import TransportForm from "./TransportForm";
import TransportService from "../../services/TransportService";
import "./Transport.css";


const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [editingTransport, setEditingTransport] = useState(null);

  useEffect(() => {
    const storedTransports = localStorage.getItem("transports");
    if (storedTransports) setTransports(JSON.parse(storedTransports));

    const storedVehicles = localStorage.getItem("vehicles");
    if (storedVehicles) setVehicles(JSON.parse(storedVehicles));

    const storedDrivers = localStorage.getItem("drivers");
    if (storedDrivers) setDrivers(JSON.parse(storedDrivers));
  }, []);

  const saveTransports = (list) => {
    setTransports(list);
    localStorage.setItem("transports", JSON.stringify(list));
  };

  const isDriverBusy = (driverName) =>
    transports.some(
      (t) => t.driver === driverName && t.status === "w trakcie"
    );

  const isVehicleBusy = (vehicleName) =>
    transports.some(
      (t) => t.vehicle === vehicleName && t.status === "w trakcie"
    );

  const handleAddTransport = async (data) => {
    const newTransport = await TransportService.addTransport(data);
    setTransports([...transports, newTransport]);
  };

  const handleEditTransport = async (t) => {
    setEditingTransport(t);
  };

  const handleUpdateTransport = async (updatedData) => {
    const updated = await TransportService.updateTransport(updatedData._id, updatedData);
    setTransports(
      transports.map((t) => t._id === updated._id ? updated : t)
    );
    setEditingTransport(null);
  };

  const handleDeleteTransport = async (id) => {
    await TransportService.deleteTransport(id);
    setTransports(transports.filter((t) => t._id !== id));
  };


  return (
    <div className="transport-container">
      <h2>Transport - Zarządzanie kursami</h2>

      <div>
        <button onClick={() => setShowForm(true)} className="add">
          Dodaj zlecenie
        </button>
      </div>

      {showForm && (
        <TransportForm
          onAdd={handleAddTransport}
          onUpdate={handleUpdateTransport}
          editing={editingTransport}
          vehicles={vehicles.filter((v) => !isVehicleBusy(v.name) || editingTransport?.vehicle === v.name)}
          drivers={drivers.filter((d) => !isDriverBusy(d.name) || editingTransport?.driver === d.name)}
          isDriverBusy={isDriverBusy}
          isVehicleBusy={isVehicleBusy}
        />
      )}

      <TransportList
        transports={transports}
        onDelete={handleDeleteTransport}
        onEdit={handleEditTransport}
      />
    </div>
  );
};

export default Transport;