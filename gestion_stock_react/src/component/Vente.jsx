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
                border: "1px solid black",
                borderRadius: "10px",
                fontSize:"0.8em"
            }}>

                {listStock.length > 0 ? listStock?.map(value =>
                        <table>
                            <thead>
                            <tr>
                                <th>IdStock</th>
                                <th>Article</th>
                                <th>Description</th>
                                <th>Nom vendeur</th>
                                <th>Prenom vendeur</th>
                                <th>Id vendeur</th>
                                <th>Prix</th>
                                <th>Quantite</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr onClick={e=>getId(e,value?.stockref,value?.prix)}>
                                <th><button>id
                                </button>
                                    idStock:{value?.stockref}</th>
                                <th>Nom article:{value?.nom}</th>
                                <th>Description Article:{value?.description}</th>
                                <th>Nom Vendeur: {value?.nomVendeur}</th>
                                <th>Prenom Vendeur: {value?.prenomVendeur}</th>
                                <th>IdUser: {value?.userId}</th>
                                <th>Prix article: {value?.prix}</th>
                                <th>quantite en stock: {value?.quantite}</th>

                            </tr>
                            </tbody>
                        </table>
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


            <div>

                <h2>Achat</h2>
                {listPanier.length > 0 ? listPanier?.map(value =>
                    <div style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        fontSize:"0.8em"
                    }}>


                        <table style={{}}>
                            <thead>
                            <tr>
                                <th>IdPanier</th>
                                <th>Prix</th>
                                <th>Date</th>
                                <th>Quantite acheté</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr onClick={e => getId(e, value?.stockref, value?.prix)}>

                                <th> <button>id
                                </button>{value?.id}</th>
                                <th>Prix: {value?.prix}</th>
                                <th>Date ajout: Panier: {new Date(""+value?.dateAjout).toLocaleDateString()}</th>
                                <th>quantite en achter: {value?.quantite}</th>
                                <th>
                                    <button onClick={e => fetchdelete(e, value?.id)}>Supprimer</button></th>

                            </tr>
                            </tbody>
                        </table>


                    </div>
                ) : []
                }
            </div>

        </div>
    )
        ;
}

export default Vente;