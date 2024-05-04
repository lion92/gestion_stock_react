import React from 'react';
import "../css/dashboard.css"
import Connexion from "./Connexion";
function DashBoardConnection(props) {
    return (
        <div className="parent">
            <div className="div1">
                <h1>Kriss CLOTILDE Stock</h1>
                <ul>
                    <li>Connexion</li>
                    <li>Inscription</li>
                    <li>Article</li>
                    <li>Stock</li>
                </ul>

            </div>
            <div className="div2"><Connexion/></div>
            <div className="div3">Tableau</div>
        </div>
    );
}

export default DashBoardConnection;