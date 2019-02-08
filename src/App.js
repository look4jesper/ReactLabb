import React, { Component } from 'react';
import './App.css';

import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import ComposeSaladModal from "./ComposeSaladModal";
import Salad from "./salad";
import ViewOrder from './ViewOrder';

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
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">Gott o' Grönt</h1>
          <p className="lead">
            Världens första helt digitala sallad
          </p>
          <hr className="my-4" />
          <p>Klicka på knappen för att börja!</p>
        </div >
  
        <div className="container">
          <ComposeSaladModal  inventory={inventory} handleOrderChange={this.handleOrderChange} />
        </div>

        <br />

        <div className="container">
          <ViewOrder order={this.state.order} removeSalad={this.removeSalad}/>
        </div>
      </div>
    );
  } 
}

export default App;
