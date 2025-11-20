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
        await api.updateWarehouse(warehouseToEdit.id, warehouseData);
      } else {
        await api.addWarehouse(warehouseData);
      }

      onWarehouseAdded(); // odśwież listę w Warehouses

      // reset formularza
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
        placeholder="Numer magazynu"
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
        <button className="submit">
          {warehouseToEdit ? "Zapisz zmiany" : "Dodaj magazyn"}
        </button>

        <button onClick={onCancelEdit} className="cancel">
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default WarehouseForm;