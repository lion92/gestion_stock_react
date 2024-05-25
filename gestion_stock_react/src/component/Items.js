// Example items, to simulate fetching from another resources.
import React, {useCallback} from "react";
import lien from "../Lien";

function Items({ currentItems }) {
    return (
        <><div>
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
            {currentItems &&
                currentItems.map((item) => (

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

                ))}     </table>
        </div>
        </>
    );
 }

export default Items;