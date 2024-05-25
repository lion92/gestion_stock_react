// Example items, to simulate fetching from another resources.
import React, {useCallback, useState} from "react";
import lien from "../Lien";

function Items2( {currentItems}) {
    let FetchAPIupdate= useCallback(async (e,id,idStock, quantite) => {
        e.preventDefault();
        const response = await fetch(
            lien.url + "stock/" + idStock,
            {
                method: "PUT",
                body: JSON.stringify({
                    quantite: quantite,
                    article:id,
                    idArticle:id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const resbis = await response;
    });

    return (
        <><div>
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
            {currentItems &&
                currentItems?.map((item) => (

                            <tbody>
                            <tr>
                                <th>{item?.stockref}</th>
                                <th>{item?.id}</th>
                                <th>{item?.userId}</th>
                                <th>{item?.nom}</th>
                                <th>{item?.description}</th>
                               <th> {item?.quantite}
                               <input defaultValue="" style={{width:"2em"}} onChange={(e)=>FetchAPIupdate(e,item?.id ,item?.stockref,parseInt(e.target.value))}/>

                               </th>
                                    <th>{item.prix}</th>
                                        <th>{new Date(""+item?.dateAjout).toLocaleDateString()}</th>

                                    </tr>
                            </tbody>

                ))}   </table>
        </div>
        </>
    );
 }

export default Items2;