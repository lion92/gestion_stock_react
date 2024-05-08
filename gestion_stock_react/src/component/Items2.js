// Example items, to simulate fetching from another resources.
import React from "react";

function Items2({ currentItems }) {


    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
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
                                        {
                                            item.quantite > 0 ? <th style={{backgroundColor:"green"}}>{item.quantite}</th> : <th style={{backgroundColor:"red"}}>{item.quantite}</th>
                                        }

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