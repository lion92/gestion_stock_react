// Example items, to simulate fetching from another resources.
import React from "react";

function Items({ currentItems }) {

    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>IdArticle</th>
                                <th>UserId</th>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Prix</th>
                                <th>Date d'ajout</th>
                            </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <th>{item.id}</th>
                                        <th>{item.userId}</th>
                                        <th>{item.nom}</th>
                                        <th>{item.description}</th>
                                        <th>{item.prix}</th>
                                        <th>{new Date(""+item?.dateAjout).toLocaleDateString()}</th>

                                    </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
        </>
    );
 }

export default Items;