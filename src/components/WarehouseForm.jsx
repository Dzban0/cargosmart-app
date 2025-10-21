import { useState } from "react";
import axios from "axios";

export const WarehouseForm = ({ onWarehouseAdded, warehouseToEdit, onCancelEdit }) => {
  const [name, setName] = useState(warehouseToEdit ? warehouseToEdit.name : "");
  const [location, setLocation] = useState(warehouseToEdit ? warehouseToEdit.location : "");
  const [capacity, setCapacity] = useState(warehouseToEdit ? warehouseToEdit.capacity : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { name, location, capacity };

      // Jeśli edytujesz magazyn
      if (warehouseToEdit) {
        await axios.put(`http://localhost:5000/api/warehouses/${warehouseToEdit.id}`, payload);
      } else {
        // Jeśli tworzysz nowy magazyn
        await axios.post("http://localhost:5000/api/warehouses", payload);
      }

      onWarehouseAdded(); // Aktualizowanie listy magazynów
    } catch (error) {
      console.error("Błąd podczas zapisywania magazynu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nazwa:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Lokalizacja:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Pojemność:</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />
      </div>
      <button type="submit">Zapisz magazyn</button>
      {warehouseToEdit && <button type="button" onClick={onCancelEdit}>Anuluj</button>}
    </form>
  );
};
