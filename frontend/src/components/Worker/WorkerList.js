import React, { useState, useEffect } from "react";
import api from "../../services/WorkerService";

const WorkerList = ({ workers, onSelectWorker, onWorkerDeleted, onEditWorker, onViewContents }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleViewContents = (e, worker) => { 
        e.stopPropagation(); 
        if (onViewContents) { 
            onViewContents(worker); 
        } 
    }; 
  
    const handleEdit = (e, worker) => {
        e.stopPropagation(); 
        if (onEditWorker) {
            onEditWorker(worker); 
        } 
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm("Czy na pewno chcesz usunąć dane?")) {
            try {
                await api.deleteWorker(id);
                onWorkerDeleted(id);
            } catch (error) {
                console.error("Błąd przy usuwaniu:", error);
            }
        }
    };

    if (!workers || workers.length === 0) {
        return (
            <div className="worker-list">
                <h>Brak danych do wyświetlenia.</h>
            </div>
        );
    }

    return (
        <div className="worker-list">
            <input
                type="text"
                placeholder="Znajdź magazyn"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, padding: "0.5rem" }}
            />

            <ul className="workers-item">
                {workers.map((worker) => (
                    <li key={worker.id} className="worker-item" onClick={() => onSelectWorker(worker)}>
                        <p className="worker-name">{worker.firstName} {worker.lastName}</p>
                        <p className="worker-position">Stanowisko: {worker.position}</p>

                        <div className="action-buttons">
                            <button onClick={(e) => handleEdit(e, worker)}>
                                Edytuj
                            </button>

                            <button onClick={(e) => handleViewContents(e, worker)}>
                                Kontakt
                            </button>

                            <button onClick={(e) => handleDelete(e, worker.id)}>
                                Usuń
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkerList;