import React, { useEffect, useState } from "react";

const DeliveryList = ({
  warehouseId,
  onSelectDelivery,
  onDeliveryDetails,
}) => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    if (warehouseId) {
      const allDeliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
      const filtered = allDeliveries.filter((d) => d.warehouseId === warehouseId);
      setDeliveries(filtered);
    }
  }, [warehouseId, onSelectDelivery]);

  if (!warehouseId) {
    return <p className="text-gray-500">Wybierz magazyn, aby zobaczyć dostawy.</p>;
  }

  return (
    <div className="delivery-list mt-4">
      <h2 className="text-lg font-bold mb-2">Dostawy</h2>
      {deliveries.length === 0 ? (
        <p className="text-gray-500">Brak dostaw dla tego magazynu.</p>
      ) : (
        <ul className="space-y-2">
          {deliveries.map((delivery) => (
            <li key={delivery.id} className="border p-2 rounded flex justify-between items-center bg-white">
              <button onClick={() => onSelectDelivery(delivery)} className="text-blue-600 font-medium hover:underline">
                {delivery.name} ({delivery.status})
              </button>
              <button onClick={() => onDeliveryDetails(delivery)} className="text-gray-500 text-sm underline hover:text-gray-700">
                Szczegóły
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveryList;