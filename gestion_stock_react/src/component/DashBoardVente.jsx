import React from 'react';
import Article from "./Article";
import DashBoard from "./DashBoard";
import Vente from "./Vente";

function DashBoardVente(props) {
    let titre = "Panier"
    let contenue = <Vente></Vente>
    return (
        <>
            <DashBoard titre={titre} contenue={contenue} ></DashBoard>
        </>
    );
}

export default DashBoardVente;