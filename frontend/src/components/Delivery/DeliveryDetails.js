const DeliveryDetails = ({ delivery, onClose }) => {
  return (
    <div className="border p-4 rounded bg-gray-50 dark:bg-gray-700 mt-4">
      <h3 className="font-bold mb-2 text-lg">{delivery.name}</h3>
      <p>Status: <strong>{delivery.status}</strong></p>
      <p>Data: {delivery.date}</p>
      <button onClick={onClose} className="text-red-500 mt-3 underline hover:text-red-700">
        Zamknij
      </button>
    </div>
  );
};

export default DeliveryDetails;