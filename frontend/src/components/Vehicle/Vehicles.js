import React, { useState, useEffect } from "react";
import "./Vehicles.css";
import VehicleService from "../../services/VehicleService";

function Vehicles({ vehicles }) {
    const [vehicle, setVehicles] = useState([
        { name: "Ford Transit", type: "Furgon", registration: "KR 12345", capacity: "", weight: "" },
        { name: "Renault Master", type: "samochód dostawczy kat. N1", registration: "PO 99887", capacity: "", weight: "" }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [newVehicle, setNewVehicle] = useState({ name: "", type: "", registration: "",  capacity: "", weight: "" });
    const [vehicleToEdit, setVehicleToEdit] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    
    const fetchVehicles = async () => {
        try {
            const data = await VehicleService.getWorkers();
            setVehicles(data);
        } catch (error) {
            console.error("Błąd przy pobieraniu", error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);
    
    const handleVehicleAdded = async () => {
        await fetchVehicles();
        setVehicleToEdit(null);
        setShowForm(false);
    };

    const handleEditVehicle = (vehicle) => {
        setVehicleToEdit(vehicle);
        setShowForm(true);
    };

    const handleCancel = () => {
        setVehicleToEdit(null);
        setShowForm(false);
    };

    const handleViewContents = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    return (
        <div className="vehicles-container">
            <h2>Lista pojazdów</h2>

            <ul>
                {vehicle.map(vehicle => (
                    <li key={vehicle.id}>
                        <p className="vehicle-name">{vehicle.name}</p>
                        <p className="vehicle-type">Typ pojazdu: {vehicle.type}; Rejestracja: {vehicle.registration}</p>
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

                    <button>Dodaj nowy pojazd</button>
                    <button>Anuluj</button>
                </div>
            )}
        </div>
    );
}

export default Vehicles;
