import React, {useCallback, useEffect, useState} from 'react';
import lien from "../Lien";
import "../css/vente.css"

function Vente(props) {
    const [listStock, setListStock] = useState([]);
    const [quantiteParoduit, setQuantiteProduit] = useState(0);
    const [listPanier, setListPanier] = useState(0);
    const [idProduit, setIdProduit] = useState(0);
    const [prixProduit, setPrixProduit] = useState(0);
    useEffect(() => {
        fetchAPIStock()
        fetchAPI()
    }, []);


    const fetchAPIStock = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        if (!isNaN(idUser) && idUser > 0) {
            const response = await fetch(lien.url + "article/stockBy/" + idUser);
            const resbis = await response.json();
            await setListStock(resbis);
            return resbis;
        }

    }, [setListStock]);

    const acheter = async (e, item, quantite) => {


        if (window.confirm("Voulez vous acheter ?")) {


            let str = "" + localStorage.getItem('jwt2')
            e.preventDefault()
            const response = await fetch(
                lien.url + "panier",
                {
                    method: "Post",
                    body: JSON.stringify({
                        user: isNaN(localStorage.getItem("utilisateur")) ? 0 : localStorage.getItem("utilisateur"),
                        quantite: quantite,
                        stock: idProduit,
                        prix: prixProduit,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            await fetchAPIStock()
            await fetchAPI()
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


    function getId(e, stockref, prix) {
        e.preventDefault();
        setIdProduit(stockref);
        setPrixProduit(prix)
    }

    return (
        <div style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>

            <h2>Article</h2>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                margin: "10px"
            }}>

                {listStock.length > 0 ? listStock?.map(value =>
                    <div className="selectArticle" onClick={e => getId(e, value?.stockref, value?.prix)} style={{
                        border: "1px solid black",
                        margin: "10px",
                        padding: "3px",
                        borderRadius: "10px",
                        height: "100%",
                        width: "12em"
                    }}>
                        <p style={{backgroundColor: "red", opacity: "0.9"}}>Cliquez pour sélectionner l'article</p>
                        <p>idStock:{value?.stockref}</p>
                        <p>Nom article:{value?.nom}</p>
                        <p>Description Article:{value?.description}</p>
                        <p>Nom Vendeur: {value?.nomVendeur}</p>
                        <p>Prenom Vendeur: {value?.prenomVendeur}</p>
                        <p>IdUser: {value?.userId}</p>
                        <p>Prix article: {value?.prix}</p>
                        <p>quantite en stock: {value?.quantite}</p>
                    </div>
                ) : []
                }

            </div>
            <div style={{alignItems: "center"}}>
                <p>Id sélectionné: {idProduit}</p>
                <label>Quantité à commander:</label>
                <input type="number" placeholder="quantite" value={quantiteParoduit}
                       onChange={(e) => setQuantiteProduit(parseInt(e.target.value))}/>
                <button onClick={e => acheter(e, idProduit, quantiteParoduit)}>Acheter</button>
            </div>


            <div style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                margin: "10px",
                gap: "10px",
            }}>

                <h2>Panier</h2>
                {listPanier.length > 0 ? listPanier?.map(value =>
                    <div className="selectArticle" style={{
                        border: "1px solid black",
                        margin: "3px",
                        padding: "3px",
                        borderRadius: "10px",
                    }}>

                        <p>Id Panier{value?.id}</p>
                        <p>Prix: {value?.prix}</p>
                        <p>Date ajout: Panier: {value?.dateAjout}</p>
                        <p>quantite en achter: {value?.quantite}</p>
                        <button onClick={e=>fetchdelete(e,value?.id)}>Supprimer</button>
                    </div>
                ) : []
                }
            </div>

        </div>
    )
        ;
}

export default Vente;