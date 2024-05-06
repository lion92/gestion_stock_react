import React, {useCallback, useEffect, useState} from 'react';
import "../css/dashboard.css"
import {NavLink} from "react-router-dom";
import lien from "../Lien";
import {PaginatedItems} from "./PaginatedItems";
import {PaginatedItems2} from "./PaginatedItems2";


function DashBoard(props) {

    return (
        <div className="parent">
            <div className="div1">
                <h1>Kriss CLOTILDE Stock</h1>
                <ul className="nav-list">
                    <NavLink to={"/"}>
                        <li>Bienvenue</li>
                    </NavLink>
                    <NavLink to={"/inscription"}>
                    <li>Inscription</li>
                </NavLink>
                    <NavLink to={"/ajoutArticle"}>
                        <li>Article</li>
                    </NavLink>
                    <NavLink to={"/stock"}>
                        <li>Stock</li>
                    </NavLink>

                </ul>

            </div>
            <div className="div2">
                <h1>{props.titre}</h1>

                {props.contenue}</div>
            <div className="div3">
                <PaginatedItems></PaginatedItems>

                <br/>
                <br/>
                <br/>

                <PaginatedItems2></PaginatedItems2>


            </div>
        </div>
    );
}

export default DashBoard;