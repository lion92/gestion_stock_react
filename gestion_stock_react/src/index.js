import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from "./component/NotFound";
import DashBoardConnexion from "./component/DashBoardConnexion";
import DashBoardArticle from "./component/DashBoardArticle";
import DashBoardStock from "./component/DashBoardStock";
import DashBoardInscription from "./component/DashBoardInscription";

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={DashBoardConnexion}/>
            <Route exact path="/article" component={DashBoardArticle}/>
            <Route exact path="/stock" component={DashBoardStock}/>
            <Route exact path="/inscription" component={DashBoardInscription}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

ReactDOM.render(<Root/>, document.getElementById('root'));


