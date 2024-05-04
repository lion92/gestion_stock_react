import React from 'react';
import "../css/dashboard.css"
import {NavLink} from "react-router-dom";
import DashBoardConnexion from "./DashBoardConnexion";

function DashBoard(props) {

    return (
        <div className="parent">
            <div className="div1">
                <h1>Kriss CLOTILDE Stock</h1>
                <ul className="nav-list">
                    <NavLink to={"/"}>
                        <li>Bienvenue</li>
                    </NavLink>
                    <NavLink to={"/article"}>
                        <li>Article</li>
                    </NavLink>
                </ul>

            </div>
            <div className="div2">
                <h1>{props.titre}</h1>

                {props.contenue}</div>
            <div className="div3"></div>
        </div>
    );
}

export default DashBoard;