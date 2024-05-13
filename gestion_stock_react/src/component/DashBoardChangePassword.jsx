import React from 'react';
import DashBoard from "./DashBoard";
import Article from "./Article";
import ChangePassword from "./ChangePassword";

function DashBoardArticle(props) {
    let titre = "Changer son password"
    let contenue = <ChangePassword></ChangePassword>
    return (
        <>
            <DashBoard titre={titre} contenue={contenue} ></DashBoard>
        </>
    );
}

export default DashBoardArticle;