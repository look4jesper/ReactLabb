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
      salads: [Salad]
    }
  
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let newSalads = this.state.salads;
    newSalads.push(event.target.state.salad);
    this.setState({salad: newSalads});
    console.log(this.state);
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
          <ComposeSaladModal  inventory={inventory} onChange={this.handleChange} />
        </div>

        <br />

        <div className="container">
          <ViewOrder salads={this.state.salads} inventory={inventory} />
        </div>
      </div>
    );
  } 
}

export default App;
