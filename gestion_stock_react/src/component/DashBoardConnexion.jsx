import React from 'react';

import DashBoard from "./DashBoard";
import Connexion from "./Connexion";

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