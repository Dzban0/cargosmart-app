export const DeliveryDetails = ({ delivery, onClose }) => {
  return (
    <div className="border p-4 rounded bg-gray-50 dark:bg-gray-700">
      <h3 className="font-bold mb-2">{delivery.name}</h3>
      <p>Status dostawy: {delivery.status}</p>
      <button onClick={onClose} className="text-red-500 mt-2">Zamknij</button>
    </div>
  );
};