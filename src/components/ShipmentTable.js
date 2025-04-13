import React from 'react';

export default function ShipmentTable({ shipments }) {
  return (
    <table className="w-full border mb-4">
      <thead>
        <tr className="bg-gray-200">
          <th>ID</th>
          <th>Cel</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map((s, i) => (
          <tr key={i} className="text-center border-t">
            <td>{s.id}</td>
            <td>{s.destination}</td>
            <td>{s.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}