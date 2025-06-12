import { useState } from "react";

export const WarehouseForm = ({ onWarehouseAdded, warehouseToEdit, onCancelEdit }) => {
  const [name, setName] = useState(warehouseToEdit ? warehouseToEdit.name : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (warehouseToEdit) {
      // Aktualizacja magazynu
      warehouseToEdit.name = name;
      // api.updateWarehouse(warehouseToEdit); // możesz dopisać w serwisie
    } else {
      // Dodanie nowego magazynu
      const newWarehouse = { id: Date.now(), name };
      const warehouses = JSON.parse(localStorage.getItem("warehouses") || "[]");
      warehouses.push(newWarehouse);
      localStorage.setItem("warehouses", JSON.stringify(warehouses));
    }
    setName("");
    onWarehouseAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 w-full"
        placeholder="Nazwa magazynu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
          {warehouseToEdit ? "Zapisz zmiany" : "Dodaj magazyn"}
        </button>
        {warehouseToEdit && (
          <button type="button" className="bg-gray-400 px-3 py-1 rounded" onClick={onCancelEdit}>
            Anuluj
          </button>
        )}
      </div>
    </form>
  );
};