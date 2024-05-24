import React from 'react';
import DashBoard from "./DashBoard";
import Stock from "./Stock";

function DashBoardArticle(props) {
    let titre = "Stock"
    let contenue = <Stock></Stock>
    return (
        <>
            <DashBoard titre={titre} contenue={contenue} ></DashBoard>
        </>
    );
}

export default DashBoardArticle;