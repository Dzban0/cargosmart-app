import React from 'react';

function OrderDetails({ order }) {
  return (
    <div>
      <h3>Szczegóły zlecenia</h3>
      <p><strong>Klient:</strong> {order.client}</p>
      <p><strong>Ładunek:</strong> {order.cargo}</p>
      <p><strong>Załadunek:</strong> {order.origin}</p>
      <p><strong>Rozładunek:</strong> {order.destination}</p>
    </div>
  );
}

export default OrderDetails;