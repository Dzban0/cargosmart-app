import React, { useState } from "react";
import './Document.css';
import Workers from "../Worker/Workers";
import Vehicles from '../Vehicle/Vehicles';

function Document() {
    const [activeList, setActiveList] = useState(null);

    return (
        <div className="document-text">
            <h2>Dokumenty</h2>

            <ul className="document">
                <li>
                    <button onClick={() => setActiveList("workers")}>
                        Lista pracowników
                    </button>
                </li>

                <li>
                    <button onClick={() => setActiveList("vehicles")}>
                        Lista pojazdów
                    </button>
                </li>
            </ul>

            {activeList === "workers" && <Workers />}
            {activeList === "vehicles" && <Vehicles />}
        </div>
    );
}

export default Document;