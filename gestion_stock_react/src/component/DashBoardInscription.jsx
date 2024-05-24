import React from 'react';
import DashBoard from "./DashBoard";
import Inscription from "./Inscription";

function DashBoardInscription(props) {
    let titre = "Inscription"
    let contenue = <Inscription></Inscription>
    return (
        <>
            <DashBoard titre={titre} contenue={contenue} ></DashBoard>
        </>
    );
}

export default DashBoardInscription;