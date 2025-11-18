import React, { useState, useEffect } from 'react';
import './HomePage.css';
import WarehouseForm from "../Warehouse/WarehouseForm";
import WarehouseList from "../Warehouse/WarehouseList";
import DeliveryForm from "../Delivery/DeliveryForm";
import DeliveryList from "../Delivery/DeliveryList";
import ProductDetails from "../Product/ProductDetails";
import ProductForm from "../Product/ProductForm";
import { KanbanBoard } from "../KanbanBoard";
import api from "../../services/api";

const HomePage = ({ warehouses, deliveries, products, setWarehouses, setDeliveries, setProducts }) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [warehouseToEdit, setWarehouseToEdit] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  
  const fetchWarehouses = async () => {
    try {
      const data = await api.getWarehouses();
      setWarehouses(data);
    } catch (error) {
      console.error("Błąd podczas pobierania magazynów:", error);
    }
  };

  const handleWarehouseAdded = async () => {
    await fetchWarehouses();
    setWarehouseToEdit(null);
  };

  const handleWarehouseDeleted = async () => {
    await fetchWarehouses();
  };

  const handleSelectWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setSelectedDelivery(null);
  };

  const handleSelectDelivery = (delivery) => {
    setSelectedDelivery(delivery);
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div className="home-page container mx-auto p-4 space-y-8">
      {/* Sekcja magazynów */}
      <section>
        <h2 className="title">Magazyny</h2>
        <WarehouseForm
          onWarehouseAdded={handleWarehouseAdded}
          warehouseToEdit={warehouseToEdit}
          onCancelEdit={() => setWarehouseToEdit(null)}
        />
        <WarehouseList
          warehouses={warehouses}
          onSelectWarehouse={handleSelectWarehouse}
          onWarehouseDeleted={handleWarehouseDeleted}
          onEditWarehouse={setWarehouseToEdit}
        />
      </section>

      {/* Sekcja dostaw */}
      {selectedWarehouse && (
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Dostawy dla: {selectedWarehouse.name}
          </h2>
          <DeliveryForm
            warehouseId={selectedWarehouse.id}
            onDeliveryAdded={async () => {
              const data = await api.getDeliveries();
              setDeliveries(data);
            }}
          />
          <DeliveryList
            warehouseId={selectedWarehouse.id}
            onSelectDelivery={handleSelectDelivery}
          />
        </section>
      )}

      {/* Sekcja produktów */}
      {selectedDelivery && (
  <section>
    <h2 className="text-xl font-semibold mb-2">
      Produkty w dostawie: {selectedDelivery.name}
    </h2>

    <ProductForm
      deliveryId={selectedDelivery.id}
      onProductAdded={() => {
        const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
        const filtered = allProducts.filter(
          (p) => p.deliveryId === selectedDelivery.id
        );
        setProducts(filtered);
      }}
    />

    <KanbanBoard
      deliveryId={selectedDelivery.id}
      products={products}
      onDeleteProduct={(id) => {
        const updated = products.filter((p) => p.id !== id);
        localStorage.setItem("products", JSON.stringify(updated));
        setProducts(updated);
      }}
      onShowDetails={setProductDetails}
    />

    {/*  Szczegóły produktu */}
    {productDetails && (
      <ProductDetails
        product={productDetails}
        onClose={() => setProductDetails(null)}
      />
    )}
  </section>
)}
    </div>
  );
};

export default HomePage;