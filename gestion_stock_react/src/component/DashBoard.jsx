import React, {useCallback, useEffect, useState} from 'react';
import "../css/dashboard.css"
import {Link, NavLink} from "react-router-dom";
import lien from "../Lien";
import {PaginatedItems} from "./PaginatedItems";
import {PaginatedItems2} from "./PaginatedItems2";
import BarGraph from "./BarGraph";
import {IoBasketOutline} from "react-icons/io5";

function DashBoard(props) {
    const [total, setTotal] = useState([]);
    const [utilisa, setUtilisa] = useState("Déconnnecté");
    const [listStock, setListStock] = useState([]);
    useEffect(() => {
        fetchAPITotal()
        fetchUerToken()
        fetchAPIStock()
        setUtilisa("" + localStorage.getItem("nom") == "null" ? "Veuillez vous connecter" : "" + localStorage.getItem("nom"))
    }, [setTotal]);
    const fetchAPIStock = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/stockBy/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;
    }, [setListStock]);

    const data = {
        labels: listStock?.length > 0 ? listStock.map(value => value?.nom) : [],
        datasets: [
            {
                label: 'Quantite',
                data: listStock?.length > 0 ? listStock.map(value => value.quantite) : [],
                backgroundColor: listStock?.length > 0 ? listStock.map(value => "lightGreen") : [],
                borderColor: 'black',


            },
            {
                label: 'Prix',
                data: listStock?.length > 0 ? listStock.map(value => value.prix) : [],
                backgroundColor: listStock?.length > 0 ? listStock.map(value => "lightBlue") : [],
                borderColor: 'green',


            }
        ]
    };

    const getExportExcel = async (e) => {
        e.preventDefault();
        let idUser = parseInt("" + localStorage.getItem("utilisateur"));
        fetch(lien.url + "article/export/" + idUser)
            .then(res => res.blob())
            .then(blob => {
                var file = window.URL.createObjectURL(blob);
                window.open(file, "_blank")
            });
    }


    const getDataPdf = async (e) => {
        e.preventDefault();
        let idUser = parseInt("" + localStorage.getItem("utilisateur"));
        fetch(lien.url + "article/generate-pdf/" + idUser)
            .then(res => res.blob())
            .then(blob => {
                var file = window.URL.createObjectURL(blob);
                window.open(file, "_blank")
            });
    }

    const fetchAPITotal = useCallback(async () => {
        let str = "" + localStorage.getItem('jwt2')
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuserSum/" + idUser, {headers: {Authorization: `Bearer ${str}`}});
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

            if (!isNaN(data?.id)) {

                if (!isNaN(data?.id)) {
                    localStorage.setItem("utilisateur", data?.id);
                    localStorage.setItem("nom", data?.nom)

                } else {

                }
            } else {
                console.log("error token")
            }
        })
    });
    return (
        <div>

            <NavLink to={"/vente"}>
                <div style={{position: "absolute", top: "10px", right: "30px"}}>Panier<IoBasketOutline/></div>
            </NavLink>
            <header style={{
                borderRadius: "10px",
                color: "mediumaquamarine", fontSize: "1em", textAlign: "center"
            }}><h1>Bienvenue</h1>
                <h2>Projet personnel</h2>
            </header>
            <div><a style={{color: "black"}} rel="kriss" href="https://projet.krissclotilde.com/" target="_blank">Qui
                suis
                je?</a></div>

            <div style={{display: "flex", flexDirection: "column"}}>
                <Link style={{width: '20px', margin: '0'}} onClick={() => {
                    localStorage.removeItem('jwt2');
                    localStorage.removeItem("utilisateur");
                    setUtilisa("Deconnecté");
                    localStorage.removeItem("nom");
                }} to="/">
                    <button style={{backgroundColor: "red"}}>Deconnexion</button>
                </Link>
                <div className="parent">

                    <div className="div1">
                        <h2>Utilisateur: {utilisa}</h2>

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
                            <NavLink to={"/changepass"}>
                                <li>Changer son mot de passe</li>
                            </NavLink>
                            <NavLink to={"/ajoutArticle"}>
                                <li>Article</li>
                            </NavLink>
                            <NavLink to={"/stock"}>
                                <li>Stock</li>
                            </NavLink>


                        </ul>

                    </div>
                    <div className={props.titre!="Vente"?"div2":"div2"}>
                        <h1>{props.titre}</h1>

                        {props.contenue}</div>

                    {props.titre !== 'Panier' ?
                        <div className="div3">
                            <PaginatedItems></PaginatedItems>

                            <br/>
                            <br/>
                            <br/>

                            <PaginatedItems2></PaginatedItems2>


                        </div> : ""
                    }


                </div>
                <div style={{marginTop: "5em", backgroundColor: "white"}}><BarGraph data={data}></BarGraph></div>
            </div>
        </div>
    );
}

export default DashBoard;