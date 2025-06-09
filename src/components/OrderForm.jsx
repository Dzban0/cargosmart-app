import React, { useState } from 'react';

function OrderForm({ onAddOrder }) {
  const [form, setForm] = useState({
    client: '',
    origin: '',
    destination: '',
    cargo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrder(form);
    setForm({ client: '', origin: '', destination: '', cargo: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj nowe zlecenie</h2>
      <input name="client" value={form.client} onChange={handleChange} placeholder="Klient" required />
      <input name="origin" value={form.origin} onChange={handleChange} placeholder="Punkt załadunku" required />
      <input name="destination" value={form.destination} onChange={handleChange} placeholder="Punkt rozładunku" required />
      <input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Ładunek" required />
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default OrderForm;