import React from "react"; 
import './Warehouses.css'; 
import api from "../../services/WarehouseService"; 

const WarehouseList = ({ warehouses, onSelectWarehouse, onWarehouseDeleted, onEditWarehouse, onViewContents }) => { 
  
  const handleViewContents = (e, warehouse) => { 
    e.stopPropagation(); 
    if (onViewContents) { 
      onViewContents(warehouse); 
    } 
  }; 
  
  const handleEdit = (e, warehouse) => {
    e.stopPropagation(); 
    if (onEditWarehouse) {
      onEditWarehouse(warehouse); 
    } 
  };

  const handleDelete = async (e, id) => { e.stopPropagation(); 
    e.stopPropagation();
    if (window.confirm("Czy na pewno chcesz usunąć ten magazyn?")) { 
      try {
        await api.deleteWarehouse(id); 
        onWarehouseDeleted(); 
      } catch (error) {
        console.error("Błąd przy usuwaniu magazynu:", error); 
      } 
    } 
  }; 

  if (!warehouses || warehouses.length === 0) { 
    return ( 
      <div className="warehouse-list"> 
        <h>Brak magazynów do wyświetlenia.</h> 
      </div> 
    ); 
  } 
  
  return ( 
    <div className="warehouse-list"> 
      <ul> 
        {warehouses.map((warehouse) => ( 
          <li key={warehouse.id} className="warehouse-item" onClick={() => onSelectWarehouse(warehouse)}> 
          
            <div> 
              <p className="warehouse-name">Magazyn {warehouse.name}</p>
              <p className="warehouse-location">{warehouse.address}, {warehouse.place}</p>
            </div>
          
            <div className="action-buttons"> 
              <button onClick={(e) => handleEdit(e, warehouse)} className="submit">
                Edytuj
              </button>
            
              <button onClick={(e) => handleViewContents(e, warehouse)} className="contents"> 
                Asortyment
              </button> 
            
              <button onClick={(e) => handleDelete(e, warehouse.id)} className="cancel">
                Usuń
              </button> 
            </div> 
          
          </li> 
        ))} 
      </ul> 
    </div> 
  ); 
}; 

export default WarehouseList;