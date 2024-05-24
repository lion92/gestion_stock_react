import React from 'react';
import {storeId} from "./store/StoreId";
import '../css/panier.css'

function PanierList(props) {

    const {idList, addId, removeId, resetIds} = storeId();
    return (
        <div>
            {idList.length > 0 ? idList?.map(value =>
                <div style={{
                    borderRadius: "10px",

                }}>


                    <table className="panier">

                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Qte</th>
                            <th>Prx</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>
                                {value?.id}<p style={{
                                backgroundColor: "red",
                                textAlign: "center",
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                bottom: "-50",
                                left: "0",
                                fontSize: "0.7em"
                            }}
                                              onClick={(e) => removeId(e, value?.id)}>X
                            </p>

                            </th>
                            <th>{value?.quantite}</th>
                            <th>{value?.prix}</th>
                        </tr>


                        </tbody>
                    </table>


                </div>
            ) : []
            }
        </div>

    );
}

export default PanierList;