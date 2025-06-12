import { useState } from "react";

export const ProductForm = ({ deliveryId, onProductAdded }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { id: Date.now(), deliveryId, name, status: "Do załadunku" };
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    setName("");
    onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 w-full"
        placeholder="Nazwa produktu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit" className="bg-purple-500 text-white px-3 py-1 rounded mt-2">Dodaj produkt</button>
    </form>
  );
};