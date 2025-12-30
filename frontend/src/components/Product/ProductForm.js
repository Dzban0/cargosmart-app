import { useState } from "react";
import { addProduct, updateProduct, PRODUCT_CATEGORIES, PRODUCT_PACKAGING_TYPES, PRODUCT_UNITS } from "./utils";

const ProductForm = ({ warehouseId, productToEdit, onSave, onCancel }) => {
  const [name, setName] = useState(productToEdit?.name || "");
  const [category, setCategory] = useState(productToEdit?.category || PRODUCT_CATEGORIES[0]);
  const [quantity, setQuantity] = useState(productToEdit?.quantity || 0);
  const [packaging, setPackaging] = useState(productToEdit?.packaging || PRODUCT_PACKAGING_TYPES[0]);
  const [packagingLength, setPackagingLength] = useState(productToEdit?.packagingLength);
  const [packagingWidth, setPackagingWidth] = useState(productToEdit?.packagingWidth);
  const [packagingHeight, setPackagingHeight] = useState(productToEdit?.packagingHeight);
  const [unitsPerPackage, setUnitsPerPackage] = useState(productToEdit?.unitsPerPackage || 0);
  const [unit, setUnit] = useState(productToEdit?.unit || PRODUCT_UNITS[0]);
  const [description, setDescription] = useState(productToEdit?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (packagingLength < 0 || packagingWidth < 0 || packagingHeight < 0) {
      alert("Wymiary opakowania muszą być większe niż 0");
      return;
    }

    const productData = {
      id: productToEdit?.id || crypto.randomUUID(),
      warehouseId,
      name,
      category,
      quantity,
      packaging,
      packagingLength,
      packagingWidth,
      packagingHeight,
      unitsPerPackage,
      unit,
      description
    };

    if (productToEdit) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="products-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nazwa produktu"
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {PRODUCT_CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Ilość"
        required
      />

      <select value={packaging} onChange={(e) => setPackaging(e.target.value)}>
        {PRODUCT_PACKAGING_TYPES.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <div className="package-dimensions">
        <input
          type="number"
          min="0"
          value={packagingLength}
          onChange={(e) => setPackagingLength(Number(e.target.value))}
          placeholder="Długość (mm)"
        />
        <input
          type="number"
          min="0"
          value={packagingWidth}
          onChange={(e) => setPackagingWidth(Number(e.target.value))}
          placeholder="Szerokość (mm)"
        />
        <input
          type="number"
          min="0"
          value={packagingHeight}
          onChange={(e) => setPackagingHeight(Number(e.target.value))}
          placeholder="Wysokość (mm)"
        />
      </div>

      <div>
        <input
          type="number"
          min="0"
          value={unitsPerPackage}
          onChange={(e) => setUnitsPerPackage(Number(e.target.value))}
          placeholder="Ilość na opakowanie"
          required
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          {PRODUCT_UNITS.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Opis (opcjonalnie)"
      />

      <div className="product-actions" style={{ marginTop: "1rem" }}>
        <button type="submit" className="submit">Zapisz</button>
        <button type="button" onClick={onCancel} className="cancel">Anuluj</button>
      </div>
    </form>
  );
};

export default ProductForm;