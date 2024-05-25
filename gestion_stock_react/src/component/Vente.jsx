import React, {useCallback, useEffect, useState} from 'react';
import lien from "../Lien";
import "../css/vente.css"
import {storeId} from "./store/StoreId";
import '../css/catalogue.css';
import {MessageStore} from "./messageInfo/MessageStore";

function Vente(props) {
    const [listStock, setListStock] = useState([]);
    const [quantiteParoduit, setQuantiteProduit] = useState(0);
    const [listPanier, setListPanier] = useState(0);
    const [idProduit, setIdProduit] = useState(0);
    const [prixProduit, setPrixProduit] = useState(0);
    const [idDelete, setIdDelete] = useState(0);
    const { idList,containsId,updateQuantity, addId, removeId, resetIds } = storeId();
    const { message, setMessage } = MessageStore()
    const [panier, setListPanier2] = useState([]);
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
                ); await fetchAPIStock()
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


    function getId(e, stockref,quantity) {
        e.preventDefault();
        setIdProduit(stockref);
        setQuantiteProduit(quantity);
    }

    return (
        <div style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
            <label>Quantité à commander:</label>

            <h2>Article</h2>
            <div style={{
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "0.8em"
            }}>

                {listStock.length > 0 ? listStock?.map(value =>
                    <table>
                        <thead>
                        <tr>
                            <th>IdStock</th>
                            <th>Article</th>
                            <th>Nom Article</th>
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

                            <input type="number" placeholder="quantite" defaultValue=""
                                   onChange={(e) => { if (parseInt(e.target.value) > 0) {
                                       console.log(idList);
                                            if(idList.filter(val=>val.id===value?.stockref).length>0){
                                                updateQuantity(e, value?.stockref, parseInt(e.target.value))
                                                setMessage(`Produit modifié au panier ${value?.stockref} quantite ${e.target.value}`)
                                            }else{
                                                addId(e, value?.stockref, parseInt(e.target.value), value?.prix)
                                                setMessage(`Produit ajouté au panier ${value?.stockref} quantite ${e.target.value}`)
                                            }


                                   }}}/>


                            <th>

                                {value?.stockref}</th>
                            <th>Nom article:{value?.nom}</th>
                            <th>Nom article:{value?.nom}</th>
                            <th>Description Article:{value?.description}</th>
                            <th>Nom Vendeur: {value?.nomVendeur}</th>
                            <th>Prenom Vendeur: {value?.prenomVendeur}</th>
                            <th>IdUser: {value?.userId}</th>
                            <th>Prix article: {value?.prix}</th>
                            <th>quantite en stock: {value?.quantite}</th>
                            <th>quantite en stock: {value?.dateAjout}</th>

                        </tr>
                        </tbody>
                    </table>
                ) : []
                }

            </div>




            <div style={{alignItems: "center"}}>
                <p>Id sélectionné: {idProduit}</p>
                <button onClick={(e) => acheter(e)}>Acheter</button>

                <button onClick={(e) => resetIds(e)}>Réinitialiser la liste</button>




            </div>

            {panier?.length>0?panier.map(val=>
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
                                <p style={{backgroundColor:"red", fontSize:"1em", width:"2em", textAlign:"center"}} onClick={(e) => fetchdelete(e, val?.id)}>x</p>
                            </th>
                            <th>Prix article: {val?.prix}</th>
                            <th>Quantite en stock: {val?.quantite}</th>
                            <th>Nom article: {val?.nomArticle}</th>
                            <th>Description article: {val?.descriptionArticle}</th>
                            <th>Id Vendeur: {val?.userId}</th>
                            <th>nom article: {val?.dateAjout}</th>

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