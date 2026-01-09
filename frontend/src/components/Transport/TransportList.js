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
      {transports.map((transport) => (
        <li key={transport._id} className="transport-item">
          <div>
            <p><strong>{transport.pickup} - {transport.destination}</strong></p>
            <p>Status: {transport.status}</p>
            <p>Kierowca: {transport.driver ? `${transport.driver.firstName} ${transport.driver.lastName}` : "NN"}</p>
            <p>Pojazd: {transport.vehicle ? transport.vehicle.name : "NN"}</p>
          </div>

          <div className="actions">
            <button disabled={transport.status === "zakończony"} onClick={() => onEdit(transport)}>
              Edytuj
            </button>

            <button onClick={() => onDelete(transport._id)}>
              Usuń
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransportList;