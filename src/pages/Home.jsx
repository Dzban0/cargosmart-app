// import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ShipmentForm from '../components/ShipmentForm';
import ShipmentTable from '../components/ShipmentTable';
import Tracking from '../components/Tracking';

export default function HomePage() {
  const [shipments, setShipments] = useState([]);
  const [trackingId, setTrackingId] = useState('');

  const addShipment = (newShipment) => {
    setShipments([...shipments, newShipment]);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">CargoSmart</h1>
        <ShipmentForm onAddShipment={addShipment} />
        <ShipmentTable shipments={shipments} />
        <Tracking trackingId={trackingId} setTrackingId={setTrackingId} shipments={shipments} />
      </div>
    </div>
  );
}