import { useState, useEffect } from "react";
import api from "../../services/api";

const WarehouseForm = ({ onWarehouseAdded, warehouseToEdit, onCancelEdit }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    if (warehouseToEdit) {
      setName(warehouseToEdit.name);
      setAddress(warehouseToEdit.address);
      setPlace(warehouseToEdit.place);
    } else {
      setName("");
      setAddress("");
      setPlace("");
    }
  }, [warehouseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const warehouseData = { name, address, place };

    try {
      if (warehouseToEdit) {
        const updated = await api.updateWarehouse(warehouseToEdit.id, warehouseData);
        onWarehouseAdded(updated);
      } else {
        const saved = await api.addWarehouse(warehouseData);
        onWarehouseAdded(saved);
      }

      // Reset
      setName("");
      setAddress("");
      setPlace("");

    } catch (error) {
      console.error("Błąd przy zapisie magazynu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="warehouse-form p-4 bg-white rounded shadow-md mb-6">

      <h2 className="text-lg font-semibold mb-4">
        {warehouseToEdit ? "Edytuj magazyn" : "Dodaj magazyn"}
      </h2>

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
        placeholder="Adres"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        className="input-field mb-4 p-2 border rounded w-full"
      />

      <input
        type="text"
        placeholder="Miasto"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        required
        className="input-field mb-4 p-2 border rounded w-full"
      />

      <div className="buttons flex justify-between">

        <button type="submit" className="submit-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {warehouseToEdit ? "Zapisz zmiany" : "Dodaj magazyn"}
        </button>

        <button type="button" onClick={onCancelEdit} className="cancel-btn text-gray-500 hover:text-gray-700">
          Anuluj
        </button>

      </div>
    </form>
  );
};

export default WarehouseForm;