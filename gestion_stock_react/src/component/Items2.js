// Example items, to simulate fetching from another resources.
import React, {useCallback, useState} from "react";
import lien from "../Lien";

function Items2( {currentItems}) {
    const [unite, setUnite] = useState(0);
    let FetchAPIupdate= useCallback(async (e,item) => {
        console.log(item);
        e.preventDefault();
        const response = await fetch(
            lien.url + "stock/" + item?.stockref,
            {
                method: "PUT",
                body: JSON.stringify({
                    quantite: unite,
                    article:item?.id,
                    idArticle:item?.id,
                    dateAjout:item?.dateAjout
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const resbis = await response;
    });

    return (
        <>
            {currentItems &&
                currentItems?.map((item) => (
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>IdStock</th>
                                <th>IdArticle</th>
                                <th>UserId</th>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>quantite</th>
                                <th>Prix</th>
                                <th>Date d'ajout</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>{item.stockref}</th>
                                <th>{item.id}</th>
                                <th>{item.userId}</th>
                                <th>{item.nom}</th>
                                <th>{item.description}</th>
                                {item.quantite > 0 ?<span  style={{width:"4em", backgroundColor:"green"}}>{item.quantite}</span>:<span style={{width:"4em", backgroundColor:"red"}}>{item.quantite}</span>}
                                {
                                    item.quantite > 0 ?
                                        <input type="number" style={{width:"4em", backgroundColor:"green"}} value={unite} onChange={(e) => setUnite(parseInt(e.target.value))}/> : <input type="number" style={{width:"4em", backgroundColor:"red"}} value={unite} onChange={(e) => setUnite(parseInt(e.target.value))}/>

                                }
                                <button style={{
                                    width:"5em",
                                }} onClick={(e)=>{FetchAPIupdate(e,item)}}>ok</button>

                                    <th>{item.prix}</th>
                                        <th>{item.dateAjout}</th>

                                    </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
        </>
    );
 }

export default Items2;