import React, { useState } from "react";
import "./Vehicles.css";
// import VehicleService from "../../services/VehicleService";

function Vehicles({ vehicles }) {
    const [showForm, setShowForm] = useState(false);

    const [vehicle, setVehicles] = useState([
        { id: 1, name: "Ford Transit", type: "", registration: "KR 12345", capacity: "", weight: "" },
        { id: 2, name: "Mercedes Sprinter", type: "", registration: "WA 67890", capacity: "", weight: "" },
        { id: 3, name: "Renault Master", type: "", registration: "PO 99887", capacity: "", weight: "" }
    ]);

    const [newVehicle, setNewVehicle] = useState({ firstName: "", lastName: "", position: "" });
    
    const handleAddVehicle = () => {
        const newId = vehicle.length + 1;
        setVehicles([...vehicle, { ...newVehicle, id: newId }]);
        setNewVehicle({ name: "", type: "", registration: "", capacity: "", weight: ""});
    };

 

    return (
        <div className="vehicles-container">
            <h2>Lista pojazdów</h2>

            <ul>
                {vehicle.map(vehicle => (
                    <li key={vehicle.id}>
                        <p className="vehicle-name">{vehicle.name}</p>
                        <p className="vehicle-type">Typ pojazdu: {vehicle.type}</p>
                        <p className="vehicle-registration">Rejestracja: {vehicle.registration}</p>
                        <p className="vehicle-capacity">Pojemność:{vehicle.capacity}</p>
                        <p className="vehicle-weight">Masa: {vehicle.weight}</p>
                    </li>
                ))}
            </ul>

            <div>
                <h2>Dodawanie</h2>

                <button onClick={() => setShowForm(true)}>
                    Dodaj nowego pojazd
                </button>
            </div>

            {showForm && (
                <div>
                    <input
                        type="text"
                        value={newVehicle.name}
                        onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                        placeholder="Nazwa pojazdu"
                    />
                    <input
                        type="text"
                        value={newVehicle.type}
                        onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                        placeholder="Typ pojazdu"
                    />
                    <input
                        type="text"
                        value={newVehicle.registration}
                        onChange={(e) => setNewVehicle({ ...newVehicle, registration: e.target.value })}
                        placeholder="Rejestacja"
                    />
                    <input
                        type="text"
                        value={newVehicle.position}
                        onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })}
                        placeholder="Pojemność"
                    />
                    <input
                        type="text"
                        value={newVehicle.position}
                        onChange={(e) => setNewVehicle({ ...newVehicle, weight: e.target.value })}
                        placeholder="Waga pojazdu"
                    />

                    <button onClick={handleAddVehicle}>Dodaj nowy pojazd</button>
                </div>
            )}
        </div>
    );
}

export default Vehicles;
