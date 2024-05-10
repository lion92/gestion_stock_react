import React, {useCallback, useEffect, useState} from 'react';
import lien from "../Lien";

function Vente(props) {
    const [listStock, setListStock] = useState([]);
    useEffect(() => {
        fetchAPIStock()
    }, []);


    const fetchAPIStock = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/stockBy/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;
    }, [setListStock]);

    const acheter = async (e, item) => {
        e.preventDefault()
        const response = await fetch(
            lien.url + "stock/" + item?.stockref,
            {
                method: "PUT",
                body: JSON.stringify({
                    quantite: parseInt("" + item.quantite) - 1,
                    article: item.idArticle,
                    idArticle: item.idArticle,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        fetchAPIStock()

    }


    return (
        <div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                margin: "10px"
            }}>

                {listStock?.map(value =>
                    <div style={{margin: "10px", backgroundColor: "blueviolet",borderRadius: "10px",}}>

                        <p>{value?.nom}</p>
                        <p>{value?.description}</p>
                        <p>{value?.prix}</p>
                        <p>quantite en stock: {value?.quantite}</p>
                        <button onClick={e => acheter(e, value)}>Acheter</button>
                    </div>
                )
                }
            </div>

        </div>
    )
        ;
}

export default Vente;