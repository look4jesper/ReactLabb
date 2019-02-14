import React, { Component } from 'react';
import './App.css';

import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import ComposeSaladModal from "./ComposeSaladModal";
import Salad from "./salad";
import ViewOrder from './ViewOrder';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    }
  
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.removeSalad = this.removeSalad.bind(this);
  }

  handleOrderChange(salad) {
    let newOrder = this.state.order;
    newOrder.push(salad);
    this.setState({order: newOrder});
  }

  removeSalad(index) {
    let newOrder = this.state.order;
    newOrder.splice(index, 1);
    this.setState({order: newOrder});
  }

  render() {
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={inventory} handleOrderChange={this.handleOrderChange} />;
    const viewOrderElem = (params) => <ViewOrder {...params} order={this.state.order} removeSalad={this.removeSalad} />;

    return (
      <Router>
        <div>
          <div className="jumbotron text-center">
            <h1 className="display-4">Gott o' Grönt</h1>
            <p className="lead">
              Världens första helt digitala sallad
            </p>
            <hr className="my-4" />
            <p>Klicka på knappen för att börja!</p>
          </div >
          <nav className="navbar navbar-expand-lg navbar-light">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link className="nav-link" to='compose-salad'>
                  Komponera din egen sallad
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='view-order'>
                  Se din beställning
                </Link>
              </li>
            </ul>
          </nav>

          <br/>

          <div className="container-fluid mx-auto">
            <Route path='/compose-salad' render={composeSaladElem}/>
            <Route path='/view-order' render={viewOrderElem}/>
          </div>
        </div>
      </Router>
    );
  } 
}

export default App;
