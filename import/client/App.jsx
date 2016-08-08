import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import DashBoard from './components/DashBoard.jsx'


class Layout extends React.Component {
    render(){
        console.log(Object.keys(this.props.children||{}));
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


export default class App extends React.Component {
    render(){
        console.log('render app');
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={DashBoard} />
                </Route>
            </Router>
        );
    }
}
