const TransportList = ({ transports, onEdit, onDelete }) => {

  if (!transports.length) {
    return <p>Brak zleceń</p>;
  }

  return (
    <ul className="transport-list">
      {transports.map(t => (
        <li key={t._id} className="transport-item">
          <div>
            <strong>{t.pickup} → {t.destination}</strong><br />
            Status: {t.status}<br />
            Kierowca: {t.driver ? `${t.driver.firstName} ${t.driver.lastName}` : "—"}<br />
            Pojazd: {t.vehicle ? t.vehicle.name : "—"}
          </div>

          <div className="actions">
            <button onClick={() => onEdit(t)}>Edytuj</button>
            <button onClick={() => onDelete(t._id)}>Usuń</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransportList;