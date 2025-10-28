import React from "react";
import { api } from "../../services/api";

export const WarehouseList = ({
  warehouses,
  onSelectWarehouse,
  onWarehouseDeleted,
  onEditWarehouse
}) => {
  const handleDelete = (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten magazyn?")) {
      api.deleteWarehouse(id);
      onWarehouseDeleted();
    }
  };

  if (!warehouses || warehouses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
        <p className="text-gray-500 text-sm">Brak magazynów do wyświetlenia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Lista magazynów</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-600">
        {warehouses.map((warehouse) => (
          <li
            key={warehouse.id}
            className="flex justify-between items-center py-2 hover:bg-gray-100 dark:hover:bg-gray-600 px-2 rounded cursor-pointer"
          >
            <div onClick={() => onSelectWarehouse(warehouse)}>
              <p className="font-medium">{warehouse.name}</p>
              <p className="text-sm text-gray-500">{warehouse.location}</p>
            </div>
            <div className="flex gap-2">
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
