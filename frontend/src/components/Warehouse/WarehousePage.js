import React, { useState, useEffect } from "react";
import WarehouseForm from "./WarehouseForm";
import WarehouseList from "./WarehouseList";
import api from "../../services/api";
import "./Warehouse.css";

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [warehouseToEdit, setWarehouseToEdit] = useState(null);

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

  const handleWarehouseAdded = (newWarehouse) => {
    setWarehouses(prev => [...prev, newWarehouse]);
    setWarehouseToEdit(null);
  };


  const handleWarehouseDeleted = () => {
    fetchWarehouses();
  };

  const handleEditWarehouse = (warehouse) => {
    setWarehouseToEdit(warehouse);
  };

  const handleCancelEdit = () => {
    setWarehouseToEdit(null);
  };

  return (
    <div className="warehouse-page p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {warehouseToEdit ? "Edycja magazynu" : "Dodaj nowy magazyn"}
      </h1>

      {/* Formularz dodawania / edycji */}
      <WarehouseForm
        onWarehouseAdded={handleWarehouseAdded}
        warehouseToEdit={warehouseToEdit}
        onCancelEdit={handleCancelEdit}
      />

      {/* Lista magazynów */}
      <WarehouseList
        warehouses={warehouses}
        onSelectWarehouse={setSelectedWarehouse}
        onWarehouseDeleted={handleWarehouseDeleted}
        onEditWarehouse={handleEditWarehouse}
      />
    </div>
  );
};

export default WarehousePage;