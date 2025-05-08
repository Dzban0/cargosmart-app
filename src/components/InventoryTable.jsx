import React from "react";

const InventoryTable = ({ inventory }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Magazyn</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Produkt</th>
            <th className="border px-4 py-2">Ilość</th>
            <th className="border px-4 py-2">Jednostka</th>
            <th className="border px-4 py-2">Lokalizacja</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{item.nazwa}</td>
              <td className="border px-4 py-2">{item.ilosc}</td>
              <td className="border px-4 py-2">{item.jednostka}</td>
              <td className="border px-4 py-2">{item.lokalizacja}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
