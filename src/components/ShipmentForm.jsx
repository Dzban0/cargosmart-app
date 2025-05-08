import React, { useState } from 'react';

export default function ShipmentForm({ onAddShipment }) {
  const [form, setForm] = useState({ id: '', destination: '', status: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id && form.destination && form.status) {
      onAddShipment(form);
      setForm({ id: '', destination: '', status: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input name="id" placeholder="ID przesyłki" value={form.id} onChange={handleChange} className="border p-1 mr-2" />
      <input name="destination" placeholder="Cel" value={form.destination} onChange={handleChange} className="border p-1 mr-2" />
      <input name="status" placeholder="Status" value={form.status} onChange={handleChange} className="border p-1 mr-2" />
      <button type="submit" className="bg-green-500 text-white px-3 py-1">Dodaj</button>
    </form>
  );
}