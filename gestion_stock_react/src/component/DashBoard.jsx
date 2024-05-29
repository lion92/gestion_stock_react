import React, {useCallback, useEffect, useState} from 'react';
import "../css/dashboard.css"
import {Link, NavLink} from "react-router-dom";
import lien from "../Lien";
import {PaginatedItems} from "./PaginatedItems";
import {PaginatedItems2} from "./PaginatedItems2";
import BarGraph from "./BarGraph";
import {IoBasketOutline} from "react-icons/io5";
import PanierList from "./PanierList";
import {CiMenuBurger} from "react-icons/ci";
import {MenuShow} from "./storeMenu/MenuShow";
import ToastMessage from "./ToastMessage";
import {Bounce, toast} from "react-toastify";

function DashBoard(props) {
    const [total, setTotal] = useState([]);

    const [listStock, setListStock] = useState([]);
    const [showMenu, setShowMenu] = useState(true);
    const { toggle, toggleState } = MenuShow()
    useEffect(() => {
        fetchAPITotal()
        fetchUerToken()
        fetchAPIStock()

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
    const getInvoicePdf = async (e) => {
        e.preventDefault();
        let idUser = parseInt("" + localStorage.getItem("utilisateur"));
        fetch(lien.url + "article/generate-invoice-pdf/" + idUser)
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
    return (<>

    <div className="pricipale">

        <NavLink to={"/vente"}>
                <div style={{
                    position: "absolute",
                    fontSize: "2em",
                    width: "3em",
                    right: "3px",
                    top: "4px",
                    textAlign:"center"

                }}>Panier <PanierList/><IoBasketOutline/></div>
            </NavLink>

            <CiMenuBurger style={{
                position: "absolute",
                top: "10px",
                left: "5px",
                width: "3em",
                height: "3em",
                textAlign: "center",
                margin: "1em",
                color:"black"
            }}
                          onClick={() => toggleState()}/>

            {toggle ?
                <ul className="menu">

                    <h2>Menu</h2>
                    <li><NavLink to={"/"}>
                        Bienvenue
                    </NavLink></li>
                    <li><NavLink to={"/inscription"}>
                        Inscription
                    </NavLink></li>
                    <li><NavLink to={"/changepass"}>
                        Modifier psw
                    </NavLink></li>
                    <li><NavLink to={"/ajoutArticle"}>
                        Article
                    </NavLink></li>
                    <li><NavLink to={"/stock"}>
                        Stock
                    </NavLink></li>
                    <li><NavLink to={"/vente"}>
                        Vente
                    </NavLink></li>


                </ul> : ""}


        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                <div className="parent">

                    <div className="div1">

                        <Link onClick={() => {
                        localStorage.removeItem('jwt2');
                        localStorage.removeItem("utilisateur");

                        localStorage.removeItem("nom");
                            toast.success("Deconnexion", {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                transition: Bounce
                            });
                    }} to="/">
                        <button style={{color: "red", margin: "1em"}}>Deconnexion</button>
                    </Link>


                        <h2>Total prix du stock:{total?.length > 0 ? total[0].prix : ""}</h2>

                        <button className="raise" onClick={getExportExcel}>Excel stock</button>
                        <button className="raise" onClick={getDataPdf}>PDF Bilan stock</button>
                        <button className="raise" onClick={getInvoicePdf}>Facture d'achats</button>
                        <h1 style={{textAlign: "center"}}>Kriss CLOTILDE Stock</h1>
                        <a style={{color: "black", textAlign: "center"}} rel="noreferrer"
                           href="https://projet.krissclotilde.com/"
                           target="_blank">Qui
                            suis
                            je?</a>
                        <h2>Projet personnel</h2>


                    </div>
                    <div className={props.titre !== "Vente" ? "div2" : "div2"}>
                        <ToastMessage></ToastMessage>
                        <h1 style={{textAlign: "center"}}>{props.titre}</h1>

                        {props.contenue}</div>

                    {!(props.titre === 'Panier' || props.titre === 'Connexion' || props.titre === 'Inscription' || props.titre === 'Changer son password') ?
                        <div className="div3">




                            <BarGraph data={data}></BarGraph>
                            <PaginatedItems></PaginatedItems>
                            <PaginatedItems2></PaginatedItems2>
                        </div> : ""
                    }


                </div>

            </div>
        <footer><p style={{color: "black", fontSize: "1em", backgroundColor: "lightgrey"}}>Cette application est un
            projet que je me suis fixé. Il
            reproduit un mini site de gestion ecommerce.<br/>
            On peut ajouter:<br/>
            -des articles,<br/>
            -leur ajouter une quantité<br/>
            -gérer les stocks<br/>
            -faire une simulation de vente avec mis à jour des stocks<br/>
            -télécharger des factures,<br/>ou des pdf de stocks</p></footer>
        </div>
        </>
    );
}

export default DashBoard;