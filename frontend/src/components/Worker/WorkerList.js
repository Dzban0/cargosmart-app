import React from "react";
import api from "../../services/WorkerService";  

const WorkerList = ({ workers, onSelectWorker, onWorkerDeleted, onEditWorker, onViewContents }) => {
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

    const handleDelete = async (e, id) => { e.stopPropagation(); 
        e.stopPropagation();
        if (window.confirm("Czy na pewno chcesz usunąć dane?")) { 
            try {
                await api.deleteWorker(id); 
                onWorkerDeleted(); 
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
        <div className="workers-container">
            <ul className="workers-item">
                {workers.map((worker) => (
                    <li key={worker.id} className="worker-item" onClick={() => onSelectWorker(worker)}>
                        <p className="worker-name">{worker.firstName} {worker.lastName}</p>
                        <p className="worker-position">Stanowisko: {worker.position}</p>
                    </li>
                ))}

                <div className="action-buttons"> 
                    <button onClick={(e) => handleEdit(e, workers)} className="submit">
                        Edytuj
                    </button>
            
                    <button onClick={(e) => handleViewContents(e, workers)} className="contents">
                        Dane
                    </button> 
            
                    <button onClick={(e) => handleDelete(e, workers.id)} className="cancel">
                        Usuń
                    </button> 
                </div> 
            </ul>
        </div>
    );
};

export default WorkerList;