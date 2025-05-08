import React from "react";

const EmployeeTable = ({ employees }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Pracownicy</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Imię</th>
            <th className="border px-4 py-2">Nazwisko</th>
            <th className="border px-4 py-2">Stanowisko</th>
            <th className="border px-4 py-2">Dział</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{emp.imie}</td>
              <td className="border px-4 py-2">{emp.nazwisko}</td>
              <td className="border px-4 py-2">{emp.stanowisko}</td>
              <td className="border px-4 py-2">{emp.dzial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;