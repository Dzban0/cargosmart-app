import { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { WarehouseForm } from "./components/WarehouseForm";
import { WarehouseList } from "./components/WarehouseList";
import { DeliveryForm } from "./components/DeliveryForm";
import { DeliveryList } from "./components/DeliveryList";
import { DeliveryDetails } from "./components/DeliveryDetails";
import { ProductForm } from "./components/ProductForm";
import { ProductDetails } from "./components/ProductDetails";
import { KanbanBoard } from "./components/KanbanBoard";

import { fetchUser, isLoggedIn, logout } from "./services/authService";
import { api } from "./services/api";

export const App = () => {
  const [user, setUser] = useState(null);
  const [warehouses, setWarehouses] = useState(api.getWarehouses());
  const [deliveries, setDeliveries] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [warehouseToEdit, setWarehouseToEdit] = useState(null);
  const [deliveryRefreshKey, setDeliveryRefreshKey] = useState(0);
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null);

  const productDetailsRef = useRef(null);
  const deliveryDetailsRef = useRef(null);

  useEffect(() => {
     const fetchWarehouses = async () => {
      const response = await fetch("/api/warehouses");
      const data = await response.json();
      setWarehouses(data);
    };
    
    const loadUser = async () => {
      const data = await fetchUser();
      if (data) setUser(data);
      else logout();
    };
    if (isLoggedIn()) loadUser();
  }, []);

  useEffect(() => {
    if (selectedDelivery) {
      const deliveryProducts = api.getProducts().filter(product => product.deliveryId === selectedDelivery.id);
      setProducts(deliveryProducts);
    } else {
      setProducts([]);
    }
  }, [selectedDelivery]);

  const handleLoginSuccess = async () => {
    const data = await fetchUser();
    setUser(data);
  };

  const handleWarehouseAdded = () => {
    setWarehouses(api.getWarehouses());
    setWarehouseToEdit(null);
  };

  const handleCancelEdit = () => {
    setWarehouseToEdit(null);
  };

  const handleSelectWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setSelectedDelivery(null);
    setSelectedProduct(null);
    setSelectedDeliveryDetails(null);
    setProducts([]);
  };

  const handleSelectDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setSelectedProduct(null);
  };

  const handleWarehouseDeleted = () => {
    setWarehouses(api.getWarehouses());
    setSelectedWarehouse(null);
    setDeliveries([]);
    setSelectedDelivery(null);
  };

  const handleShowProductDetails = (product) => {
    setSelectedProduct(product);
    setTimeout(() => {
      productDetailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleShowDeliveryDetails = (delivery) => {
    setSelectedDeliveryDetails(delivery);
    setTimeout(() => {
      deliveryDetailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 bg-white dark:bg-gray-800 dark:text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            {warehouseToEdit ? (
              <WarehouseForm
                onWarehouseAdded={handleWarehouseAdded}
                warehouseToEdit={warehouseToEdit}
                onCancelEdit={handleCancelEdit}
              />
            ) : (
              <>
                <WarehouseForm onWarehouseAdded={handleWarehouseAdded} />
                <WarehouseList
                  warehouses={warehouses}
                  onSelectWarehouse={handleSelectWarehouse}
                  onWarehouseAdded={handleWarehouseAdded}
                  onEditWarehouse={setWarehouseToEdit}
                  onWarehouseDeleted={handleWarehouseDeleted}
                />
              </>
            )}
          </div>

          <div>
            {selectedWarehouse && (
              <>
                <DeliveryForm
                  warehouseId={selectedWarehouse.id}
                  onDeliveryAdded={() => {
                    setSelectedDelivery(null);
                    setDeliveryRefreshKey(prev => prev + 1);
                  }}
                />
                <DeliveryList
                  warehouseId={selectedWarehouse.id}
                  onSelectDelivery={handleSelectDelivery}
                  onDeliveryDetails={handleShowDeliveryDetails}
                  refreshKey={deliveryRefreshKey}
                />
                {selectedDeliveryDetails && (
                  <div ref={deliveryDetailsRef}>
                    <DeliveryDetails
                      delivery={selectedDeliveryDetails}
                      onClose={() => setSelectedDeliveryDetails(null)}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            {selectedDelivery && (
              <>
                <ProductForm
                  deliveryId={selectedDelivery.id}
                  onProductAdded={() => {
                    const updated = api.getProducts().filter(product => product.deliveryId === selectedDelivery.id);
                    setProducts(updated);
                    setSelectedProduct(null);
                  }}
                />
                <KanbanBoard
                  deliveryId={selectedDelivery.id}
                  products={products}
                  onDeleteProduct={(id) => {
                    api.deleteProduct(id);
                    const updated = api.getProducts().filter(product => product.deliveryId === selectedDelivery.id);
                    setProducts(updated);
                  }}
                  onShowDetails={handleShowProductDetails}
                />
                {selectedProduct && (
                  <div ref={productDetailsRef}>
                    <ProductDetails
                      productId={selectedProduct.id}
                      onClose={() => setSelectedProduct(null)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;