import React from "react";
import './Warehouse.css';
import api from "../../services/api";

const WarehouseList = ({
  warehouses,
  onSelectWarehouse,
  onWarehouseDeleted,
  onEditWarehouse
}) => {
  const handleDelete = async (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten magazyn?")) {
      await api.deleteWarehouse(id);
      onWarehouseDeleted();
    }
  };

  if (!warehouses || warehouses.length === 0) {
    return (
      <div className="warehouse-list">
        <p>Brak magazynów do wyświetlenia.</p>
      </div>
    );
  }

  return (
    <div className="warehouse-list">
      <h2>Lista magazynów</h2>
      <ul>
        {warehouses.map((warehouse) => (
          <li key={warehouse.id} className="warehouse-item">

            <div onClick={() => onSelectWarehouse(warehouse)}>
              <p className="warehouse-name">{warehouse.name}</p>
              <p className="warehouse-location">{warehouse.place}</p>
            </div>

            <div className="action-buttons">
              <button onClick={() => onEditWarehouse(warehouse)} className="text-blue-500 hover:text-blue-700">
                Edytuj
              </button>
              <button onClick={() => handleDelete(warehouse.id)} className="text-red-500 hover:text-red-700">
                Usuń
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseList;