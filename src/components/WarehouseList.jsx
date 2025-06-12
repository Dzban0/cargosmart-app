export const WarehouseList = ({ warehouses, onSelectWarehouse, onEditWarehouse, onWarehouseDeleted }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Lista magazynów</h2>
      <ul className="space-y-2">
        {warehouses.map((warehouse) => (
          <li key={warehouse.id} className="border p-2 rounded flex justify-between items-center">
            <button onClick={() => onSelectWarehouse(warehouse)} className="text-blue-600 font-medium">
              {warehouse.name}
            </button>
            <div className="flex gap-2">
              <button onClick={() => onEditWarehouse(warehouse)} className="text-yellow-600">Edytuj</button>
              <button onClick={() => {
                const confirm = window.confirm(`Na pewno usunąć magazyn "${warehouse.name}"?`);
                if (confirm) {
                  let warehouses = JSON.parse(localStorage.getItem("warehouses") || "[]");
                  warehouses = warehouses.filter(w => w.id !== warehouse.id);
                  localStorage.setItem("warehouses", JSON.stringify(warehouses));
                  onWarehouseDeleted();
                }
              }} className="text-red-600">Usuń</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};