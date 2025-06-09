import React, { useState } from 'react';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ client: '', origin: '', destination: '', cargo: '' });
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrders([...orders, { ...form, id: Date.now() }]);
    setForm({ client: '', origin: '', destination: '', cargo: '' });
  };

  const OrderCard = ({ order }) => (
    <Card className="my-2 p-4 hover:bg-gray-50 transition cursor-pointer" onClick={() => setSelectedOrder(order)}>
      <CardContent>
        <div className="text-lg font-semibold">{order.client} - {order.cargo}</div>
        <div className="text-sm text-gray-500">{order.origin} ➜ {order.destination}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">CARGOSMART - Zarządzanie procesami w logistycze</h1>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input name="client" value={form.client} onChange={handleChange} placeholder="Klient" required />
        <Input name="origin" value={form.origin} onChange={handleChange} placeholder="Załadunek" required />
        <Input name="destination" value={form.destination} onChange={handleChange} placeholder="Rozładunek" required />
        <Input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Ładunek" required />
        <Button type="submit" className="col-span-1 md:col-span-4">Dodaj zlecenie</Button>
      </form>

      {/* Orders List */}
      <div className="space-y-2">
        {orders.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>

      {/* Selected Order Details */}
      {selectedOrder && (
        <Card className="mt-6 p-4 bg-blue-50">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">Szczegóły zlecenia</h2>
            <p><strong>Klient:</strong> {selectedOrder.client}</p>
            <p><strong>Załadunek:</strong> {selectedOrder.origin}</p>
            <p><strong>Rozładunek:</strong> {selectedOrder.destination}</p>
            <p><strong>Ładunek:</strong> {selectedOrder.cargo}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
