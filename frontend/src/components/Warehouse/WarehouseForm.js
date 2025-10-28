import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export const WarehouseForm = ({ onWarehouseAdded, warehouseToEdit, onCancelEdit }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (warehouseToEdit) {
      setName(warehouseToEdit.name);
      setLocation(warehouseToEdit.location);
    } else {
      setName("");
      setLocation("");
    }
  }, [warehouseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (warehouseToEdit) {
      api.updateWarehouse(warehouseToEdit.id, { name, location });
    } else {
      api.addWarehouse({ name, location });
    }

    setName("");
    setLocation("");
    onWarehouseAdded();
  };

  return (
    <div className="p-4 bg-white rounded shadow-md dark:bg-gray-700 mb-4">
      <h2 className="text-lg font-semibold mb-2">
        {warehouseToEdit ? "Edytuj magazyn" : "Dodaj magazyn"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm mb-1">Nazwa magazynu</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Lokalizacja</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            {warehouseToEdit ? "Zapisz zmiany" : "Dodaj"}
          </button>
          {warehouseToEdit && (
            <button type="button" onClick={onCancelEdit} className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded">
              Anuluj
            </button>
          )}
        </div>
      </form>
    </div>
  );
};