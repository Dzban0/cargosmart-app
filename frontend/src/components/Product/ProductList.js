import { useState } from "react";

const ProductList = ({ products, onSelect, onEdit, onDelete }) => {
  const [openDetails, setOpenDetails] = useState(null);

  const toggleDetails = (id) => {
    setOpenDetails(openDetails === id ? null : id);
  };

  return (
    <ul className="products-list">
      {products.map((product) => (
        <li key={product.id} className="product-item">

          <div className="product-header">
            <span className="product-name" onClick={() => onSelect(product)}>
              {product.name}
            </span>

            <div className="action-buttons">
              <button onClick={() => onEdit(product)} className="submit">Edytuj</button>
              <button onClick={() => onDelete(product.id)} className="cancel">Usuń</button>
              <button onClick={() => toggleDetails(product.id)} className="details">
                {openDetails === product.id ? "Ukryj" : "Szczegóły"}
              </button>
            </div>
          </div>

          {openDetails === product.id && (
            <div className="product-details">
              <p><strong>ID produktu:</strong> {product.id}</p>
              <p><strong>Kategoria produktu:</strong> {product.category}</p>
              <p><strong>Ilość opakowań w magazynie:</strong> {product.quantity}</p>
              <p><strong>Wymiary opakowania:</strong> {product.packagingLength} x {product.packagingWidth} x {product.packagingHeight} mm^{3}</p>
              <p><strong>Rodzaj opakowania:</strong> {product.packaging}</p>
              <p><strong>Ilość w 1 opakowaniu:</strong> {product.unitsPerPackage} {product.unit}</p>
              {product.description && <h><strong>Opis:</strong> {product.description}</h>}
            </div>
          )}

        </li>
      ))}
    </ul>
  );
};

export default ProductList;