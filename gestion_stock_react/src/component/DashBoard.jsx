import React, {useCallback, useEffect, useState} from 'react';
import "../css/dashboard.css"
import {NavLink} from "react-router-dom";
import lien from "../Lien";
import {PaginatedItems} from "./PaginatedItems";
import {PaginatedItems2} from "./PaginatedItems2";


function DashBoard(props) {
    const [total, setTotal] = useState([]);

    useEffect(() => {
        fetchAPITotal()
    }, [setTotal]);

    const fetchAPITotal = useCallback(async () => {
        let str = "" + localStorage.getItem('jwt2')
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuserSum/" + idUser,{headers:{Authorization: `Bearer ${str}`}});
        const resbis = await response.json();
        await setTotal(resbis);

        return resbis;
    }, [setTotal]);
    return (
        <div className="parent">

            <div className="div1">
                <h2>Total prix du stock:{total?.length > 0 ? total[0].prix : ""}</h2>
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