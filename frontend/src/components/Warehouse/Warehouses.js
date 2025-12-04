import React, { useState, useEffect } from "react";
import './Warehouses.css';
import WarehouseForm from "./WarehouseForm";
import WarehouseList from "./WarehouseList";
import Products from "../Product/Products"
import WarehouseService from "../../services/WarehouseService";

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [warehouseToEdit, setWarehouseToEdit] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchWarehouses = async () => {
    try {
      const data = await WarehouseService.getWarehouses();
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
    setSelectedWarehouse(warehouse);
  };

  return (
    <div className="warehouses-container">
      <h2>Lista magazynów</h2>

      <input
        type="text"
        placeholder="Znajdź magazyn"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1, padding: "0.5rem" }}
      />

      <div>
        <h2>Dodawanie</h2>
        <button onClick={() => setShowForm(true)} className="add">
          Dodaj magazyn
        </button>
      </div>

      {showForm && (
        <WarehouseForm
          warehouseToEdit={warehouseToEdit}
          onWarehouseAdded={handleWarehouseAdded}
          onCancelEdit={handleCancel}
        />
      )}

      <WarehouseList
        warehouses={warehouses}
        onSelectWarehouse={(w) => console.log("Wybrano magazyn:", w.name)}
        onWarehouseDeleted={fetchWarehouses}
        onEditWarehouse={handleEditWarehouse}
        onViewContents={handleViewContents}
      />

      {selectedWarehouse && (
        <div className="warehouse-contents">
          <h2>Produkty w magazynie: {selectedWarehouse.name}</h2>

          <Products warehouseId={selectedWarehouse.id} />

          <p className="action-buttons">
            <button onClick={() => setSelectedWarehouse(null)} className="contents">
              Zamknij
            </button>
          </p>
        </div>
      )}

    </div>
  );
};

export default Warehouses;