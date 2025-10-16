import { useState, useEffect } from "react";
import { api } from '../services/api';

export const WarehouseForm = ({ onWarehouseAdded, warehouseToEdit, onCancelEdit }) => {
  const [name, setName] = useState(warehouseToEdit ? warehouseToEdit.name : "");
  const [address, setAddress] = useState(warehouseToEdit ? warehouseToEdit.address : "");
  // const [length, setLength] = useState(warehouseToEdit ? warehouseToEdit.dimensions?.length : "");
  // const [width, setWidth] = useState(warehouseToEdit ? warehouseToEdit.dimensions?.width : "");
  // const [height, setHeight] = useState(warehouseToEdit ? warehouseToEdit.dimensions?.height : "");

  useEffect(() => {
    if (!warehouseToEdit) {
      setName("");
      setAddress("");
      // setLength("");
      // setWidth("");
      // setHeight("");
    }
  }, [warehouseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const warehouseData = {
      name,
      address,
      // dimensions: {
      //   length: Number(length),
      //   width: Number(width),
      //   height: Number(height),
      // },
    };

    if (warehouseToEdit) {
      const updatedWarehouse = { ...warehouseToEdit, ...warehouseData };
      await api.updateWarehouse(updatedWarehouse);
    } else {
      await api.addWarehouse(warehouseData);
    }

    setName("");
    setAddress("");
    // setLength("");
    // setWidth("");
    // setHeight("");
    onWarehouseAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-lg font-bold">{warehouseToEdit ? 'Edytuj' : 'Dodaj'} magazyn</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nazwa" required className="input" />
      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adres" className="input" />
      <input value={length} onChange={(e) => setLength(e.target.value)} placeholder="Długość (m)" className="input" />
      <input value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Szerokość (m)" className="input" />
      <input value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Wysokość (m)" className="input" />
      
      <button type="submit" className="btn btn-primary">
        {warehouseToEdit ? 'Zapisz zmiany' : 'Dodaj magazyn'}
      </button>

      {warehouseToEdit && (
        <button onClick={onCancelEdit} type="button" className="btn btn-secondary ml-2">Anuluj</button>
      )}
    </form>
  );
};
