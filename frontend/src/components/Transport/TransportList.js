import React from "react";

const TransportList = ({ transports, onDelete, onEdit }) => {
  if (!transports || transports.length === 0) {
    return (
      <div className="transport-list">
        <h3>Brak zleceń transportowych.</h3>
      </div>
    );
  }

  return (
    <table className="transport-table">
      <thead>
        <tr>
          <th>Kierowca</th>
          <th>Pojazd</th>
          <th>Odbiór</th>
          <th>Cel</th>
          <th>Status</th>
          <th>Akcje</th>
        </tr>
      </thead>

      <tbody>
        {transports.map((t) => (
          <tr key={t._id || t.id}>
            <td>{t.driver}</td>
            <td>{t.vehicle}</td>
            <td>{t.pickup}</td>
            <td>{t.destination}</td>
            <td>{t.status}</td>

            <td>
              <button onClick={() => onEdit(t)}>Edytuj</button>
              <button className="delete" onClick={() => onDelete(t._id || t.id)}>
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
