import React from 'react';

function OrderList({ orders, onSelect }) {
  return (
    <div>
      <h2>Lista zleceń</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.client} – {order.cargo}
            <button onClick={() => onSelect(order.id)}>Szczegóły</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;