import React from 'react';

export default function Tracking({ trackingId, setTrackingId, shipments }) {
  const shipment = shipments.find(s => s.id === trackingId);

  return (
    <div>
      <h3 className="text-xl mb-2">Śledzenie przesyłki</h3>
      <input
        type="text"
        placeholder="Wprowadź ID przesyłki"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        className="border p-1 mr-2"
      />
      {shipment ? (
        <div className="mt-2 bg-gray-100 p-2 rounded">
          <p><strong>ID:</strong> {shipment.id}</p>
          <p><strong>Cel:</strong> {shipment.destination}</p>
          <p><strong>Status:</strong> {shipment.status}</p>
        </div>
      ) : trackingId && (
        <p className="text-red-500 mt-2">Brak przesyłki o podanym ID</p>
      )}
    </div>
  );
}