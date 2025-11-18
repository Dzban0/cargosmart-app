import { useState, useEffect } from "react";
import api from "../../services/api";

const WarehouseForm = ({ onWarehouseAdded, warehouseToEdit, onCancelEdit }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const warehouseData = { name, location };

    try {
      if (warehouseToEdit) {
        await api.updateWarehouse(warehouseToEdit.id, warehouseData);
      } else {
        const saved = await api.addWarehouse(warehouseData);
        onWarehouseAdded(saved);
      }

      onWarehouseAdded();
      setName("");
      setLocation("");
    } catch (error) {
      console.error("Błąd przy zapisie magazynu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="warehouse-form p-4 bg-white rounded shadow-md mb-6">
      <input
        type="text"
        placeholder="Nazwa magazynu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input-field mb-4 p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Lokalizacja"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="input-field mb-4 p-2 border rounded w-full"
      />

      <div className="buttons flex justify-between">
        <button type="submit" className="submit-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {warehouseToEdit ? "Edytuj magazyn" : "Dodaj magazyn"}
        </button>

        {warehouseToEdit && (
          <button type="button" onClick={onCancelEdit} className="cancel-btn text-gray-500 hover:text-gray-700">
            Anuluj edycję
          </button>
        )}
      </div>
    </form>
  );
};

export default WarehouseForm;