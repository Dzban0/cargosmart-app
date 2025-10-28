export const DeliveryList = ({ warehouseId, onSelectDelivery, onDeliveryDetails, refreshKey }) => {
  const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]").filter(
    (d) => d.warehouseId === warehouseId
  );

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Dostawy</h2>
      <ul className="space-y-2">
        {deliveries.map((delivery) => (
          <li key={delivery.id} className="border p-2 rounded flex justify-between items-center">
            <button onClick={() => onSelectDelivery(delivery)} className="text-blue-600 font-medium">
              {delivery.name} ({delivery.status})
            </button>
            <button onClick={() => onDeliveryDetails(delivery)} className="text-gray-500 text-sm underline">
              Szczegóły
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};