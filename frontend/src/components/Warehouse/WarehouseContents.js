import Products from "../Product/Products";

const WarehouseContents = ({ warehouse }) => {
  return (
    <div className="warehouse-contents">
      <h3>Produkty w magazynie</h3>
      <Products warehouseId={warehouse.id} />
    </div>
  );
};

export default WarehouseContents;