import React from 'react';
import Connexion from "./Connexion";
import DashBoard from "./DashBoard";

function DashBoardConnexion(props) {
    let titre = "Connexion"
    let contenue = <Connexion></Connexion>
    return (
        <>
            <DashBoard titre={titre} contenue={contenue} ></DashBoard>
        </>
    );
}

export default DashBoardConnexion;