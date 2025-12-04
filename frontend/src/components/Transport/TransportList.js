import React from "react";

const TransportList = ({ transports, onDelete, onEdit }) => {
  if (transports.length === 0) {
    return (
      <div className="transport-list">
        <h>Brak zleceń transportowych.</h>
      </div>
    );
  }

  return (
    <table className="transport-table">
      <thead>
        <tr>
          <th>Kierowca</th>
          <th>Pojazd</th>
          <th>Trasa</th>
          <th>Status</th>
          <th>Akcje</th>
        </tr>
      </thead>

      <tbody>
        {transports.map((t) => (
          <tr key={t.id}>
            <td>{t.driver}</td>
            <td>{t.vehicle}</td>
            <td>{t.route}</td>
            <td>{t.status}</td>

            <td>
              <button onClick={() => onEdit(t)}>Edytuj</button>
              <button className="delete" onClick={() => onDelete(t.id)}>
                Usuń
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransportList;
