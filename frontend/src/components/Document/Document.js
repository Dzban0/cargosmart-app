import React from "react";
import './Document.css';
import FAQ from './FAQ';

function Document () {
    return (
        <div className="document-text">
            <h2>Dokumentacja</h2>

            <ul className="document">
                <li>
                    <button to="/docs/user">Dokumentacja dla użytkownika</button>
                </li>

                <li>
                    <button to="/docs/tech">Dokumentacja techniczna</button>
                </li>

                <li>
                    <button to="/deployment">Odbiór / Wdrożenie</button>
                </li>

                <li>
                    <button to="./FAQ">FAQ</button>
                </li>
            </ul>

        </div>
    );
}

export default Document;