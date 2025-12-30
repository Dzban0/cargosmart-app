import React, { useEffect, useState } from "react";
import TransportList from "./TransportList";
import TransportForm from "./TransportForm";
import TransportService from "../../services/TransportService";
import WorkerService from "../../services/WorkerService";
import VehicleService from "../../services/VehicleService";
import './Transport.css';

const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransport, setEditingTransport] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    TransportService.getTransports()
      .then(setTransports)
      .catch(console.error);

    WorkerService.getWorkers()
      .then(setDrivers)
      .catch(console.error);

    VehicleService.getVehicles()
      .then(setVehicles)
      .catch(console.error);
  }, []);

  const isDriverBusy = (driverId) =>
    transports.some(
      (t) =>
        t.driver?._id === driverId &&
        t.status === "w trakcie" &&
        t._id !== editingTransport?._id
    );

  const isVehicleBusy = (vehicleId) =>
    transports.some(
      (t) =>
        t.vehicle?._id === vehicleId &&
        t.status === "w trakcie" &&
        t._id !== editingTransport?._id
    );

  const handleAddTransport = async (data) => {
    const newTransport = await TransportService.addTransport(data);
    setTransports((prev) => [...prev, newTransport]);
    setShowForm(false);
  };

  const handleUpdateTransport = async (data) => {
    const updated = await TransportService.updateTransport(data._id, data);
    setTransports((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
    setEditingTransport(null);
    setShowForm(false);
  };

  const handleDeleteTransport = async (id) => {
    await TransportService.deleteTransport(id);
    setTransports((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEditTransport = (transport) => {
    setEditingTransport(transport);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTransport(null);
    setShowForm(false);
  };

  return (
    <div className="transport-container">
      <h2>Transport</h2>

      <button onClick={() => setShowForm(true)}>Dodaj zlecenie</button>

      {showForm && (
        <TransportForm
          editing={editingTransport}
          onAdd={handleAddTransport}
          onUpdate={handleUpdateTransport}
          onCancelEdit={handleCancel}
          drivers={drivers}
          vehicles={vehicles}
          isDriverBusy={isDriverBusy}
          isVehicleBusy={isVehicleBusy}
        />
      )}

      <TransportList
        transports={transports}
        onEdit={handleEditTransport}
        onDelete={handleDeleteTransport}
      />
    </div>
  );
};

export default Transport;
