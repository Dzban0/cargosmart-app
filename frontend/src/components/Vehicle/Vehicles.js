import React from "react";
import "./Vehicles.css";
import VehicleService from "../../services/VehicleService";

function Vehicles() {
    const vehicle = [
        { id: 1, name: "Ford Transit", type: "", registration: "KR 12345", capacity: "", weight: "" },
        { id: 2, name: "Mercedes Sprinter", type: "", registration: "WA 67890", capacity: "", weight: "" },
        { id: 3, name: "Renault Master", type: "", registration: "PO 99887", capacity: "", weight: "" }
    ];

    return (
        <div className="vehicles-container">
            <h2>Lista pojazdów</h2>

            <li key={vehicle.id}>
                <p className="vehicle-name">{vehicle.name}</p>
                <p className="vehicle-type">Typ pojazdu: {vehicle.type}</p>
                <p className="vehicle-registration">Rejestracja: {vehicle.registration}</p>
                <p className="vehicle-capacity">{vehicle.capacity}</p>
                <p className="vehicle-weight">Masa: {vehicle.weight}</p>
            </li>
        </div>
    );
}

export default Vehicles;
