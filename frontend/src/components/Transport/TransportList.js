import api from "../../services/TransportService"; 

const TransportList = ({ transports, onEdit, onDelete, onTransportDeleted, onEditTransport, onViewContents }) => {
  const handleViewContents = (e, transport) => { 
    e.stopPropagation(); 
    if (onViewContents) { 
      onViewContents(transport); 
    } 
  }; 
  
  const handleEdit = (e, transport) => {
    e.stopPropagation(); 
    if (onEditTransport) {
      onEditTransport(transport); 
    } 
  };

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