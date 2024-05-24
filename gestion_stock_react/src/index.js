import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from "./component/NotFound";
import DashBoardConnexion from "./component/DashBoardConnexion";
import DashBoardArticle from "./component/DashBoardArticle";
import DashBoardStock from "./component/DashBoardStock";
import DashBoardInscription from "./component/DashBoardInscription";
import DashBoardVente from "./component/DashBoardVente";
import DashBoardChangePassword from "./component/DashBoardChangePassword";

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={DashBoardConnexion}/>
            <Route exact path="/ajoutArticle" component={DashBoardArticle}/>
            <Route exact path="/stock" component={DashBoardStock}/>
            <Route exact path="/inscription" component={DashBoardInscription}/>
            <Route exact path="/vente" component={DashBoardVente}/>
            <Route exact path="/changepass" component={DashBoardChangePassword}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

ReactDOM.render(<Root/>, document.getElementById('root'));


