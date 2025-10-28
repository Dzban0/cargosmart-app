import { useState } from "react";

export const DeliveryForm = ({ warehouseId, onDeliveryAdded }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDelivery = { id: Date.now(), warehouseId, name, status: "Oczekująca" };
    const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
    deliveries.push(newDelivery);
    localStorage.setItem("deliveries", JSON.stringify(deliveries));
    setName("");
    onDeliveryAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 w-full"
        placeholder="Nazwa dostawy lub transportu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded mt-2">Dodaj dostawę</button>
    </form>
  );
};