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
        fetchUerToken()
    }, [setTotal]);

    const getExportExcel = async (e) => {
        e.preventDefault();
        let idUser = parseInt("" + localStorage.getItem("utilisateur"));
        fetch(lien.url + "article/export/" + idUser)
            .then(res => res.blob())
            .then(blob => {
                var file = window.URL.createObjectURL(blob);
                window.location.assign(file);
            });
    }


    const getDataPdf = async (e) => {
        e.preventDefault();
        let idUser = parseInt("" + localStorage.getItem("utilisateur"));
        fetch(lien.url + "article/generate-pdf/" + idUser)
            .then(res => res.blob())
            .then(blob => {
                var file = window.URL.createObjectURL(blob);
                window.location.assign(file);
            });
    }

    const fetchAPITotal = useCallback(async () => {
        let str = "" + localStorage.getItem('jwt2')
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuserSum/" + idUser,{headers:{Authorization: `Bearer ${str}`}});
        const resbis = await response.json();
        await setTotal(resbis);

        return resbis;
    }, [setTotal]);

    let fetchUerToken = useCallback(async (e) => {
        let str = "" + localStorage.getItem('jwt2')


        let response = await fetch(
            lien.url + "connection/user",
            {
                method: "POST",
                body: JSON.stringify({
                    jwt: str
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

        await response?.json().then(data => {

            if(!isNaN(data?.id)) {

                if (!isNaN(data?.id)) {
                    localStorage.setItem("utilisateur", data?.id);
                    localStorage.setItem("nom", data?.nom)

                } else {

                }
            }else{
                console.log("error token")
            }
        })
    });
    return (
        <div className="parent">

            <div className="div1">
                <h2>Utilisateur: { "" + localStorage.getItem('nom')}</h2>

                <h2>Total prix du stock:{total?.length > 0 ? total[0].prix : ""}</h2>
                <button className="raise" onClick={getExportExcel}>Download Excel</button>
                <button className="raise" onClick={getDataPdf}>DownloadPDFBilan</button>
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