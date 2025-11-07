export const KanbanBoard = ({ deliveryId, products, onDeleteProduct, onShowDetails }) => {
  const statuses = ["Do załadunku", "W drodze", "Dostarczone"];

  return (
    <div className="grid grid-cols-3 gap-2">
      {statuses.map(status => (
        <div key={status} className="bg-gray-200 p-2 rounded">
          <h4 className="font-bold text-sm">{status}</h4>
          {products.filter(p => p.status === status).map(product => (
            <div key={product.id} className="bg-white p-1 my-1 rounded shadow flex justify-between items-center">
              <button onClick={() => onShowDetails(product)} className="text-sm">{product.name}</button>
              <button onClick={() => onDeleteProduct(product.id)} className="text-red-500 text-xs">Usuń</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};