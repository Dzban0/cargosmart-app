import React, { useState, useEffect } from "react";
import "./Workers.css";
import WorkerService from "../../services/WorkerService";
import WorkerForm from "./WorkerForm";
import WorkerList from "./WorkerList";

function Workers() {
    const [workers, setWorkers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [workerToEdit, setWorkerToEdit] = useState(null);
    const [selectedWorker, setSelectedWorker] = useState(null);

    const fetchWorkers = async () => {
        try {
            const data = await WorkerService.getWorkers();
            setWorkers(data);
        } catch (error) {
            console.error("Błąd przy pobieraniu", error);
        }
    };

    useEffect(() => {
        fetchWorkers();
    }, []);
    
    const handleWorkerAdded = async () => {
        await fetchWorkers();
        setWorkerToEdit(null);
        setShowForm(false);
    };

    const handleEditWorker = (worker) => {
        setWorkerToEdit(worker);
        setShowForm(true);
    };

    const handleCancel = () => {
        setWorkerToEdit(null);
        setShowForm(false);
    };

    const handleViewContents = (worker) => {
        setSelectedWorker(worker);
    };

    return (
        <div className="workers-container">
            <h2>Lista pracowników</h2>
            
            <WorkerList 
                workers={workers}
                onEditWorker={handleEditWorker}
                onViewContents={handleViewContents}
                onSelectWorker={(worker) => console.log("Wybrano:", worker)}
            />

            <h2>Dodawanie</h2>
            
            <button onClick={() => setShowForm(true)}>
                Dodaj nowego pracownika
            </button>

            {showForm && (
                <WorkerForm
                    workerToEdit={workerToEdit}
                    onWorkerAdded={handleWorkerAdded}
                    onCancelEdit={handleCancel}
                />
            )}
        </div>
    );
}

export default Workers;