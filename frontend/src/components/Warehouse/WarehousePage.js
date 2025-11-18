import React, { useState, useEffect } from "react";
import WarehouseForm from "./WarehouseForm";
import WarehouseList from "./WarehouseList";
import api from "../../services/api";
import "./Warehouse.css";

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseToEdit, setWarehouseToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const data = await api.getWarehouses();
      setWarehouses(data);
    } catch (error) {
      console.error("Błąd podczas pobierania magazynów:", error);
    }
  };

  const handleWarehouseAdded = (warehouse) => {
    if (warehouseToEdit) {
      setWarehouses(prev =>
        prev.map(w => (w.id === warehouse.id ? warehouse : w))
      );
    } else {
      setWarehouses(prev => [...prev, warehouse]);
    }

    setWarehouseToEdit(null);
    setShowForm(false);
  };

  const handleWarehouseDeleted = () => {
    fetchWarehouses();
  };

  const handleEditWarehouse = (warehouse) => {
    setWarehouseToEdit(warehouse);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setWarehouseToEdit(null);
    setShowForm(false);
  };

  return (
    <div className="warehouse-page p-6 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {warehouseToEdit ? "Edycja magazynu" : "Magazyny"}
        </h1>

        {!showForm && (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>
            Dodaj nowy magazyn
          </button>
        )}
      </div>

      {showForm && (
        <WarehouseForm
          onWarehouseAdded={handleWarehouseAdded}
          warehouseToEdit={warehouseToEdit}
          onCancelEdit={handleCancelEdit}
        />
      )}

      <WarehouseList
        warehouses={warehouses}
        onSelectWarehouse={() => {}}
        onWarehouseDeleted={handleWarehouseDeleted}
        onEditWarehouse={handleEditWarehouse}
      />
    </div>
  );
};

export default WarehousePage;