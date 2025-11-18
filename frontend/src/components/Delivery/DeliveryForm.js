import { useState } from "react";

const DeliveryForm = ({ warehouseId, onDeliveryAdded }) => {
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!warehouseId) return alert("Wybierz magazyn przed dodaniem dostawy.");

    const newDelivery = {
      id: Date.now(),
      warehouseId,
      name: deliveryName,
      date: deliveryDate,
      status: "Oczekująca",
    };

    const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
    deliveries.push(newDelivery);
    localStorage.setItem("deliveries", JSON.stringify(deliveries));

    onDeliveryAdded(newDelivery);

    setDeliveryName("");
    setDeliveryDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Dodaj nową dostawę</h3>

      <div className="mb-2">
        <label className="block text-sm font-medium">Nazwa dostawy</label>
        <input
          type="text"
          value={deliveryName}
          onChange={(e) => setDeliveryName(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Data</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Dodaj
      </button>
    </form>
  );
};

export default DeliveryForm;