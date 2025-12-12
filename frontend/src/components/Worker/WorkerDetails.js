import React, { useState, useEffect } from "react";
import api from "../../services/WorkerService";

const WorkerDetails = ({ workerId, onClose }) => {
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        api.getWorker(workerId).then(res => setWorker(res.data));
    }, [workerId]);

    if (!worker) return <div>Ładowanie...</div>;

    const handleSave = async () => {
        await api.updateWorker(worker._id, worker);
        alert("Zapisano!");
        onClose();
    };

    return (
        <div className="modal">
            <h2>Dane pracownika</h2>

            <input
                type="text"
                value={worker.firstName}
                onChange={(e) => setWorker({ ...worker, firstName: e.target.value })}
            />

            <input
                type="text"
                value={worker.lastName}
                onChange={(e) => setWorker({ ...worker, lastName: e.target.value })}
            />

            <input
                type="text"
                value={worker.position}
                onChange={(e) => setWorker({ ...worker, position: e.target.value })}
            />

            <input
                type="text"
                placeholder="Telefon"
                value={worker.phone || ""}
                onChange={(e) => setWorker({ ...worker, phone: e.target.value })}
            />

            <input
                type="email"
                placeholder="Email"
                value={worker.email || ""}
                onChange={(e) => setWorker({ ...worker, email: e.target.value })}
            />

            <button onClick={handleSave}>Zapisz</button>
            <button onClick={onClose}>Zamknij</button>
        </div>
    );
};

export default WorkerDetails;