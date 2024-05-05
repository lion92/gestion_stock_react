import React, {useCallback, useEffect, useState} from 'react';
import "../css/dashboard.css"
import {NavLink} from "react-router-dom";
import lien from "../Lien";


function DashBoard(props) {
    let [listArticle, setListArticle] = useState([]);

    const fetchAPI = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser/" + idUser);
        const resbis = await response.json();
        await setListArticle(resbis);
        return resbis;
    }, [setListArticle]);
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
                <button onClick={fetchAPI}>>Actualiser</button>

                {props.contenue}</div>
            <div className="div3">
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Date d'ajout</th>
                    </tr>
                    </thead>
                    <tbody>

                    {listArticle?.map((item, index) => {
                        return <>
                            <tr>
                                <th>{item.id}</th>
                                <th >{item.id}</th>
                                <th >{item.description}</th>
                                <th >{item.prix}</th>
                                <th>{item.dateAjout}</th>

                            </tr>
                        </>;
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashBoard;