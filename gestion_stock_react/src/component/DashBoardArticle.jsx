import React from 'react';
import DashBoard from "./DashBoard";
import Article from "./Article";

function DashBoardArticle(props) {
    let titre = "Article"
    let contenue = <Article></Article>
    return (
        <>
            <DashBoard titre={titre} contenue={contenue} ></DashBoard>
        </>
    );
}

export default DashBoardArticle;