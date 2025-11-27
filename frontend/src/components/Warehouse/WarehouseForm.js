import { useState, useEffect } from "react";
import WarehouseService from "../../services/WarehouseService";

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
        await WarehouseService.updateWarehouse(warehouseToEdit.id, warehouseData);
      } else {
        await WarehouseService.addWarehouse(warehouseData);
      }

      onWarehouseAdded();

      setName("");
      setAddress("");
      setPlace("");
    } catch (error) {
      console.error("Błąd przy zapisie magazynu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="warehouse-form">

      <h2 className="edit">
        {warehouseToEdit ? "Edytuj magazyn" : "Dodaj magazyn"}
      </h2>

      <input
        type="text"
        placeholder="Numer magazynu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Adres"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Miasto"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        required
      />

      <div className="action-buttons">
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