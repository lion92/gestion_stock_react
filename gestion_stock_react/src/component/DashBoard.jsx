import React, {useCallback, useEffect, useState} from 'react';
import "../css/dashboard.css"
import {Link, NavLink} from "react-router-dom";
import lien from "../Lien";
import {PaginatedItems} from "./PaginatedItems";
import {PaginatedItems2} from "./PaginatedItems2";
import BarGraph from "./BarGraph";
import {IoBasketOutline} from "react-icons/io5";
import PanierList from "./PanierList";
import {MessageStore} from "./messageInfo/MessageStore";

function DashBoard(props) {
    const [total, setTotal] = useState([]);
    const [utilisa, setUtilisa] = useState("Déconnnecté");
    const [listStock, setListStock] = useState([]);
    const [showMenu, setShowMenu] = useState(true);
    const { message, setMessage } = MessageStore()
    useEffect(() => {
        fetchAPITotal()
        fetchUerToken()
        fetchAPIStock()
        setUtilisa("" + localStorage.getItem("nom") === "null" ? "Veuillez vous connecter" : "" + localStorage.getItem("nom"))
    }, []);
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
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'black',


            },
            {
                label: 'Prix',
                data: listStock?.length > 0 ? listStock.map(value => value.prix) : [],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
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
    }, []);
    return (
        <div>
            <h1 style={{color:"red", textAlign:"center"}}>{message}</h1>
            <ul className="menu" >

                <h2>Menu</h2>
                <li><NavLink to={"/"}>
                    Bienvenu
                </NavLink></li>
                <li><NavLink to={"/inscription"}>
                    Inscription
                </NavLink></li>
                <li><NavLink to={"/changepass"}>
                    Changer son mot de passe
                </NavLink></li>
                <li><NavLink to={"/ajoutArticle"}>
                    Article
                </NavLink></li>
                <li><NavLink to={"/stock"}>
                    Stock
                </NavLink></li>


            </ul>
            <Link style={{width: '20px', margin: '0'}} onClick={() => {
                localStorage.removeItem('jwt2');
                localStorage.removeItem("utilisateur");
                setUtilisa("Deconnecté");
                localStorage.removeItem("nom");
            }} to="/">
                <button style={{backgroundColor: "red"}}>Deconnexion</button>
            </Link>
            <NavLink to={"/vente"}>
                <div style={{
                    position: "absolute",
                    fontSize: "1.2em",
                    height: "50%",
                    top: "5em",
                    right: "30px",
                    width: "15%"
                }}>Panier <PanierList/><IoBasketOutline/></div>
            </NavLink>


            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                <div className="parent">

                    <div className="div1">

                        <h2>Utilisateur: {utilisa}</h2>

                        <h2>Total prix du stock:{total?.length > 0 ? total[0].prix : ""}</h2>

                        <button className="raise" onClick={getExportExcel}>Download Excel</button>
                        <button className="raise" onClick={getDataPdf}>DownloadPDFBilan</button>
                        <h1 style={{textAlign: "center"}}>Kriss CLOTILDE Stock</h1>
                        <a style={{color: "black", textAlign: "center"}} rel="noreferrer"
                                href="https://projet.krissclotilde.com/"
                                target="_blank">Qui
                            suis
                            je?</a>
                        <h1>Bienvenu</h1>
                        <h2>Projet personnel</h2>


                    </div>
                    <div className={props.titre !== "Vente" ? "div2" : "div2"}>
                        <h1 style={{textAlign:"center"}}>{props.titre}</h1>

                        {props.contenue}</div>

                    {!(props.titre === 'Panier' || props.titre === 'Connexion' || props.titre === 'Inscription' || props.titre === 'Changer son password') ?
                        <div className="div3">
                            <PaginatedItems></PaginatedItems>

                            <br/>
                            <br/>
                            <br/>

                            <PaginatedItems2></PaginatedItems2>

                            <BarGraph data={data}></BarGraph>
                        </div> : ""
                    }


                </div>

            </div>
        </div>
    );
}

export default DashBoard;