import React, {useCallback, useEffect, useState} from 'react';
import lien from "../Lien";
import "../css/vente.css"
import {storeId} from "./store/StoreId";
import '../css/catalogue.css';
import {Bounce, toast} from "react-toastify";

function Vente(props) {
    const [listStock, setListStock] = useState([]);
    const [quantiteParoduit, setQuantiteProduit] = useState(0);
    const [listPanier, setListPanier] = useState(0);
    const [idProduit, setIdProduit] = useState(0);
    const [prixProduit, setPrixProduit] = useState(0);
    const [idDelete, setIdDelete] = useState(0);
    const {idList, containsId, updateQuantity, addId, removeId, resetIds} = storeId();
    const [panier, setListPanier2] = useState([]);
    const [nomValue, setNomValue] = useState("");
    const [nomVendeur, setNomVendeur] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    useEffect(() => {
        fetchAPIStock()
        fetchAPI()
        fetchPanier()
    }, []);


    const fetchAPIStock = useCallback(async () => {

        const response = await fetch(lien.url + "article/all-stock");
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;

    }, [setListStock]);

    const fetchAPIBynom = useCallback(async (e, nom) => {
        e.preventDefault()

        const response = await fetch(lien.url + "article/all-stock-bynom/" + nom);

        let resbis =null;
        console.log(nom)
        if (nom === "") {
            await fetchAPIStock()
        } else {
            resbis = await response?.json();
            await setListStock(resbis);
        }

        return resbis;

    }, [setListStock]);

    const fetchAPIByDescription = useCallback(async (e,description) => {
        e.preventDefault()
        const response = await fetch(lien.url + "article/all-stock-bydescription/" + description);
        let resbis =null;
        if (description === "") {
            await fetchAPIStock()
        } else {
            resbis = await response?.json();
            await setListStock(resbis);
        }

        return resbis;

    }, [setListStock]);

    const fetchAPIByNomVendeur = useCallback(async (e,nom) => {
        e.preventDefault()
        const response = await fetch(lien.url + "article/all-stock-bynomvendeur/" + nom);

        let resbis =null;
        if (nom === "") {
            await fetchAPIStock()
        } else {
            resbis = await response?.json();
            await setListStock(resbis);
        }
        return resbis;

    }, [setListStock]);


    const fetchPanier = useCallback(async () => {

        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        if (!isNaN(idUser) && idUser > 0) {
            const response = await fetch(lien.url + "panier/byuser/" + idUser);
            const resbis = await response.json();
            console.log("text")
            setListPanier2(resbis)
            console.log(resbis)
            return resbis;
        }
    });

    const acheter = async (e) => {
        e.preventDefault();
        if (window.confirm("Voulez vous acheter ?")) {

            for (const value of idList) {
                let str = "" + localStorage.getItem('jwt2')
                e.preventDefault()
                const response = await fetch(
                    lien.url + "panier",
                    {
                        method: "Post",
                        body: JSON.stringify({
                            user: isNaN(localStorage.getItem("utilisateur")) ? 0 : localStorage.getItem("utilisateur"),
                            quantite: value?.quantite,
                            stock: value?.id,
                            prix: value?.prix,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                await fetchAPIStock()
                await fetchAPI()
                await fetchPanier()
            }

        }


    }

    let fetchdelete = useCallback(async (e, id) => {
        e.preventDefault();
        let str = "" + localStorage.getItem('jwt2')
        const response = await fetch(
            lien.url + "panier/" + id,
            {
                method: "DELETE",
                body: JSON.stringify({
                    jwt: str
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        await fetchAPI();
        await fetchPanier()


        const resbis = await response;
    });


    const fetchAPI = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        if (!isNaN(idUser)) {
            const response = await fetch(lien.url + "panier/byuser/" + idUser);
            const resbis = await response.json();
            console.log(resbis);

            await setListPanier(resbis);

            return resbis;
        }
    }, [setListPanier]);


    function getId(e, stockref, quantity) {
        e.preventDefault();
        setIdProduit(stockref);
        setQuantiteProduit(quantity);
    }

    return (
        <div style={{display: "flex", alignItems: "center", flexDirection:"column"}}>

            <h2>Article</h2>
            <div style={{
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "0.8em"
            }}>
                <input placeholder="nom filtre" defaultValue="" onChange={async (e) => {
                    await fetchAPIBynom(e, e.target.value)
                }}/>
                <input placeholder="description filtre" defaultValue="" onChange={async (e) => {
                    await fetchAPIByDescription(e, e.target.value)
                }}/>
                <input placeholder="nom vendeur filtre" defaultValue="" onChange={async (e) => {
                    await fetchAPIByNomVendeur(e, e.target.value)
                }}/>
                <div style={{alignItems: "center", display: "flex", flexWrap: "wrap"}}>
                    <p>Id sélectionné: {idProduit}</p>
                    <button onClick={(e) => acheter(e)}>Acheter</button>

                    <button onClick={(e) => resetIds(e)}>Réinitialiser la liste</button>


                </div>

                {listStock.length > 0 ? listStock?.map(value =>
                    <table>
                        <thead>
                        <tr>
                            <th>IdStock</th>
                            <th>Id Article</th>
                            <th>Article</th>

                            <th>Description</th>
                            <th>Nom vendeur</th>
                            <th>Prenom vendeur</th>
                            <th>Id vendeur</th>
                            <th>Prix</th>
                            <th>Quantite</th>
                            <th>Date ajout</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>

                                {value?.stockref}

                            </th>
                            <th>{value?.id}</th>
                            <th>{value?.nom}</th>

                            <th>{value?.description}</th>
                            <th>{value?.nomVendeur}</th>
                            <th>{value?.prenomVendeur}</th>
                            <th>{value?.userId}</th>
                            <th>{value?.prix}</th>
                            <th>{value?.quantite}
                                <span>qté à acheter</span>
                                <input type="number" style={{width: "3em"}} placeholder="quantite" defaultValue=""
                                       onChange={(e) => {
                                           if (parseInt(e.target.value) > 0) {
                                               console.log(idList);
                                               if (idList.filter(val => val.id === value?.stockref).length > 0) {
                                                   updateQuantity(e, value?.stockref, parseInt(e.target.value))
                                                   toast.success(`Produit modifié au panier ${value?.stockref} quantite ${e.target.value}`, {
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

                                               } else {
                                                   addId(e, value?.stockref, parseInt(e.target.value), value?.prix)

                                                   toast.success(`Produit ajouté au panier ${value?.stockref} quantite ${e.target.value}`, {
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
                                               }


                                           }
                                       }}/>
                            </th>
                            <th>{value?.dateAjout}</th>

                        </tr>
                        </tbody>
                    </table>
                ) : []
                }
                <div className="cardContainer">
                    {listStock.length > 0 ? listStock.map(value =>

                        <div className="card__body"><p>Acheter:</p>
                            <input type="number" style={{width: "3em", padding: "10px"}} placeholder="qte"
                                   defaultValue=""
                                   onChange={(e) => {
                                       if (parseInt(e.target.value) > 0) {
                                           console.log(idList);
                                           if (idList.filter(val => val.id === value?.stockref).length > 0) {
                                               updateQuantity(e, value?.stockref, parseInt(e.target.value))

                                               toast.success(`Produit modifié au panier ${value?.stockref} quantite ${e.target.value}`, {
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
                                           } else {
                                               addId(e, value?.stockref, parseInt(e.target.value), value?.prix)
                                               toast.success(`Produit ajouté au panier ${value?.stockref} quantite ${e.target.value}`, {
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
                                           }


                                       }
                                   }}/>
                            <h1>{value?.nom}</h1>
                            <h2>{value?.prix}</h2>

                        </div>
                    ) : []}
                </div>

            </div>


            {panier?.length > 0 ? panier.map(val =>
                <div style={{display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "center"}}>
                    <table>
                        <thead>
                        <tr>
                            <th>IdPanier</th>
                            <th>Prix</th>
                            <th>Quantite</th>
                            <th>Nom article</th>
                            <th>Description Article</th>
                            <th>UserId</th>
                            <th>Date Ajout</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>IdPanier: {val?.id}
                                <p style={{backgroundColor: "red", fontSize: "1em", width: "2em", textAlign: "center"}}
                                   onClick={(e) => fetchdelete(e, val?.id)}>x</p>
                            </th>
                            <th>Prix article: {val?.prix}</th>
                            <th>Quantite en stock: {val?.quantite}</th>
                            <th>Nom article: {val?.nomArticle}</th>
                            <th>Description article: {val?.descriptionArticle}</th>
                            <th>Id Vendeur: {val?.userId}</th>
                            <th>Date: {val?.dateAjout}</th>

                        </tr>
                        </tbody>
                    </table>


                </div>
            ) : ""}
        </div>
    )
        ;
}

export default Vente;