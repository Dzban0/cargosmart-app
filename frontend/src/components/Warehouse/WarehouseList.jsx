import { useState, useEffect } from "react";
import axios from "axios";

export const WarehouseList = ({ onSelectWarehouse, onWarehouseDeleted, onEditWarehouse }) => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/warehouses");
        setWarehouses(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania magazynów:", error);
      }
    };

    fetchWarehouses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/warehouses/${id}`);
      onWarehouseDeleted();
    } catch (error) {
      console.error("Błąd podczas usuwania magazynu:", error);
    }
  };

  return (
    <ul>
      {warehouses.map(warehouse => (
        <li key={warehouse.id}>
          <div>
            <p>{warehouse.name}</p>
            <button onClick={() => onSelectWarehouse(warehouse)}>Wybierz</button>
            <button onClick={() => onEditWarehouse(warehouse)}>Edytuj</button>
            <button onClick={() => handleDelete(warehouse.id)}>Usuń</button>
          </div>
        </li>
      ))}
    </ul>
  );
};