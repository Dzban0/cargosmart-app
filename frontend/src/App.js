import React, { useState, useEffect } from "react";
import './App.css';
import HomePage from './components/HomePage/HomePage';

function App() {
  const [warehouses, setWarehouses] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      const response = await fetch("/api/warehouses");
      const data = await response.json();
      setWarehouses(data);
    };
    fetchWarehouses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto p-4">
        <HomePage
          warehouses={warehouses}
          deliveries={deliveries}
          products={products}
          setWarehouses={setWarehouses}
          setDeliveries={setDeliveries}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
}

export default App;