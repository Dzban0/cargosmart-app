import React, { useState, useEffect } from "react";
import './Warehouses.css';
import WarehouseForm from "./WarehouseForm";
import WarehouseList from "./WarehouseList";
import api from "../../services/api";

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [warehouseToEdit, setWarehouseToEdit] = useState(null);

  const fetchWarehouses = async () => {
    try {
      const data = await api.getWarehouses();
      setWarehouses(data);
    } catch (error) {
      console.error("Błąd przy pobieraniu magazynów:", error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleWarehouseAdded = async () => {
    await fetchWarehouses();   
    setWarehouseToEdit(null); 
    setShowForm(false);
  };

  const handleEditWarehouse = (warehouse) => {
    setWarehouseToEdit(warehouse); 
    setShowForm(true);
  };

  const handleCancel = () => {
    setWarehouseToEdit(null);
    setShowForm(false);
  };

  const handleViewContents = (warehouse) => {
    console.log("Zawartość magazynu:", warehouse.name);
  };

  return (
    <div className="warehouses-container p-4 bg-gray-100 rounded">

      {/* Przycisk Dodaj magazyn */}
      {!showForm && (
        <div>
          <button onClick={() => setShowForm(true)} className="add">
            Dodaj magazyn
          </button>
        </div>
      )}

      {/* Formularz dodawania / edycji */}
      {showForm && (
        <WarehouseForm
          warehouseToEdit={warehouseToEdit}
          onWarehouseAdded={handleWarehouseAdded}
          onCancelEdit={handleCancel}
        />
      )}

      {/* Lista magazynów */}
      <WarehouseList
        warehouses={warehouses}
        onSelectWarehouse={(w) => console.log("Wybrano magazyn:", w.name)}
        onWarehouseDeleted={fetchWarehouses}
        onEditWarehouse={handleEditWarehouse}
      />
    </div>
  );
};

export default Warehouses;