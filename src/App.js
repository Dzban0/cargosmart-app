import { useState, useEffect } from 'react';

function App() {
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({
    orderNumber: '',
    client: '',
    origin: '',
    destination: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/shipments')
      .then(res => res.json())
      .then(data => setShipments(data));
  }, []);

  const handleAddShipment = async () => {
    const res = await fetch('http://localhost:5000/api/shipments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newShipment),
    });
    const data = await res.json();
    setShipments([...shipments, data]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CARGOSMART - Zarządzanie przesyłkami</h1>

      <input
        placeholder="Nr zamówienia"
        value={newShipment.orderNumber}
        onChange={e => setNewShipment({ ...newShipment, orderNumber: e.target.value })}
      />
      <input
        placeholder="Klient"
        value={newShipment.client}
        onChange={e => setNewShipment({ ...newShipment, client: e.target.value })}
      />
      <input
        placeholder="Pochodzenie"
        value={newShipment.origin}
        onChange={e => setNewShipment({ ...newShipment, origin: e.target.value })}
      />
      <input
        placeholder="Cel"
        value={newShipment.destination}
        onChange={e => setNewShipment({ ...newShipment, destination: e.target.value })}
      />
      <button onClick={handleAddShipment}>Dodaj przesyłkę</button>

      <h2>Lista przesyłek</h2>
      <ul>
        {shipments.map(shipment => (
          <li key={shipment._id}>
            {shipment.orderNumber} - {shipment.client} ({shipment.origin} → {shipment.destination}) [{shipment.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;