import React from "react";
import "./Workers.css";

function Workers() {
    const worker = [
        { id: 1, firstName: "", lastName: "", position: "Kierowca" },
        { id: 2, firstName: "", lastName: "", position: "Spedytor" },
        { id: 3, firstName: "", lastName: "", position: "Magazynier" }
    ];

    return (
        <div className="workers-container">
            <h2>Lista pracowników</h2>

            <li key={worker.id}>
                <p className="worker-name">{worker.firstName} {worker.lastName}</p>
                <p className="worker-position">Stanowisko: {worker.position}</p>
            </li>
        </div>
    );
}

export default Workers;