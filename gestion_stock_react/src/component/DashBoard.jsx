import React, {useCallback, useEffect, useState} from 'react';
import "../css/dashboard.css"
import {NavLink} from "react-router-dom";
import lien from "../Lien";


function DashBoard(props) {
    let [listArticle, setListArticle] = useState([]);
    let [listStock, setListStock] = useState([]);

    const fetchAPI = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser/" + idUser);
        const resbis = await response.json();
        await setListArticle(resbis);
        return resbis;
    }, [setListArticle]);

    const fetchAPIStock = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/stockBy/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;
    }, [setListStock]);
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
                <button onClick={fetchAPIStock}>>Actualiser</button>

                {props.contenue}</div>
            <div className="div3">
                <table>
                    <thead>
                    <tr>
                        <th>IdArticle</th>
                        <th>UserId</th>
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
                                <th>{item.userId}</th>
                                <th>{item.nom}</th>
                                <th>{item.description}</th>
                                <th>{item.prix}</th>
                                <th>{item.dateAjout}</th>

                            </tr>
                        </>;
                    })}
                    </tbody>
                </table>

                <table>
                    <thead>
                    <tr>
                        <th>IdStock</th>
                        <th>IdArticle</th>
                        <th>UserId</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>quantite</th>
                        <th>Prix</th>
                        <th>Date d'ajout</th>
                    </tr>
                    </thead>
                    <tbody>

                    {listStock?.map((item, index) => {
                        return <>
                            <tr>
                                <th>{item.stockref}</th>
                                <th>{item.id}</th>
                                <th>{item.userId}</th>
                                <th>{item.nom}</th>
                                <th>{item.description}</th>
                                <th>{item.quantite}</th>
                                <th>{item.prix}</th>
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