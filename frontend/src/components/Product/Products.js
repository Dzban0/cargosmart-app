import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { getProducts, deleteProduct } from "./utils";
import "./Products.css";

const Products = ({ warehouseId }) => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadProducts = () => {
    const stored = getProducts().filter((p) => p.warehouseId === warehouseId);
    setProducts(stored);
  };

  useEffect(() => {
    loadProducts();
  }, [warehouseId]);

  const handleDelete = (id) => {
    deleteProduct(id);
    loadProducts();
  };

  const handleSave = () => {
    loadProducts();
    setActiveProduct(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setActiveProduct(null);
    setShowForm(true);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">

      <div className="top-actions">
        <input
          type="text"
          placeholder="Szukaj produktu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
        />
      </div>

      <ProductList
        products={filteredProducts}
        onSelect={(p) => { setActiveProduct(p); setShowForm(true); }}
        onEdit={(p) => { setActiveProduct(p); setShowForm(true); }}
        onDelete={handleDelete}
      />

      <div className="top-actions">
        <button onClick={handleAddNew} className="add">
          Dodaj produkt
        </button>
      </div>

      {showForm && (
        <ProductForm
          warehouseId={warehouseId}
          productToEdit={activeProduct}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Products;