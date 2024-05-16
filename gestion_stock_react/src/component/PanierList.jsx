import React from 'react';
import {storeId} from "./store/StoreId";

function PanierList(props) {

    const {idList, addId, removeId, resetIds} = storeId();
    return (
        <div>
            {idList.length > 0 ? idList?.map(value =>
                <div style={{
                    border: "1px solid black",
                    borderRadius: "10px",

                }}>


                    <table style={{}}>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Qte</th>
                            <th>Prx</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr

                        >
                            <th>{value?.id}
                                <button onClick={(e) => removeId(e, value?.id)}>X</button>
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