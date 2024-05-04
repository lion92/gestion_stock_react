import React from 'react';
import "../css/dashboard.css"
import Article from "./Article";
function DashBoard(props) {
    return (
        <div className="parent">
            <div className="div1">Menu</div>
            <div className="div2"><Article/></div>
            <div className="div3">Tableau</div>
        </div>
    );
}

export default DashBoard;