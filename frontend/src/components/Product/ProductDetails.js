const ProductDetails = ({ productId, onClose }) => {
  const product = JSON.parse(localStorage.getItem("products") || "[]").find((p) => p.id === productId);

  if (!product) return null;

  return (
    <div className="border p-4 rounded bg-gray-50 dark:bg-gray-700">
      <h3 className="font-bold mb-2">{product.name}</h3>
      <p>Status: {product.status}</p>
      <button onClick={onClose} className="text-red-500 mt-2">Zamknij</button>
    </div>
  );
};

export default ProductDetails;