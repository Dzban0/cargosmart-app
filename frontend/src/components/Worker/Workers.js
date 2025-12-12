import React, { useState } from "react";
import WorkerList from "./WorkerList";
import "./Workers.css";

function Workers() {
    const [showForm, setShowForm] = useState(false);

    const [workers, setWorkers] = useState([
        { id: 1, firstName: "Marcin", lastName: "Musiał", position: "Kierowca" },
        { id: 2, firstName: "Piotr", lastName: "Nowak", position: "Spedytor" },
        { id: 3, firstName: "Ewa", lastName: "Kowalska", position: "Magazynier" }
    ]);
    const [newWorker, setNewWorker] = useState({ firstName: "", lastName: "", position: "" });

    const handleAddWorker = () => {
        const newId = workers.length + 1;
        setWorkers([...workers, { ...newWorker, id: newId }]);
        setNewWorker({ firstName: "", lastName: "", position: "" });
    };

    return (
        <div className="workers-container">
            <h2>Lista pracowników</h2>
            
            <WorkerList />

            <div>
                <h2>Dodawanie</h2>
                <button onClick={() => setShowForm(true)}>
                    Dodaj nowego pracownika
                </button>
            </div>

            {showForm && (
                <div>
                <input
                    type="text"
                    value={newWorker.firstName}
                    onChange={(e) => setNewWorker({ ...newWorker, firstName: e.target.value })}
                    placeholder="Imię"
                />
                <input
                    type="text"
                    value={newWorker.lastName}
                    onChange={(e) => setNewWorker({ ...newWorker, lastName: e.target.value })}
                    placeholder="Nazwisko"
                />
                <input
                    type="text"
                    value={newWorker.position}
                    onChange={(e) => setNewWorker({ ...newWorker, position: e.target.value })}
                    placeholder="Stanowisko"
                />
                <button onClick={handleAddWorker}>Dodaj pracownika</button>
            </div>
            )}

            
        </div>
    );
}

export default Workers;