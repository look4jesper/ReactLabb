import React, { Component } from 'react';
import './App.css';

import ComposeSalad from "./ComposeSalad";
import ComposeSaladModal from "./ComposeSaladModal";
import Salad from "./salad";
import ViewOrder from './ViewOrder';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      inventory: {}
    }
  
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.removeSalad = this.removeSalad.bind(this);
  }
  componentDidMount() {
   let newOrder = this.state.order;
    const protoSalad = new Salad();
    for (let index = 1; index <= window.localStorage.length; index++) {
      let salad = window.localStorage.getItem('Sallad ' + index);
      salad = JSON.parse(salad);
      Object.setPrototypeOf(salad, protoSalad);
      newOrder.push(salad);
    }
    this.setState({order: newOrder});
    console.log(this.state.order);
    

    let urlBase = 'http://localhost:8080/';
    let categories = ['foundations/', 'proteins/', 'extras/', 'dressings/']

    Promise.all(categories.map(e => fetch(urlBase + e)
    .then(promise => { if (promise.status === 200) {
      return promise.json();
    }
    })))
    .then(data => Promise.all(data.map(e => {
      e.map(name => {
        fetch(urlBase + categories[data.indexOf(e)] + name)
          .then(promise => {if (promise.status === 200) {
            return promise.json();
          } 
        })
        .then(data =>  {
          let ingredient = {};
          ingredient[name] = data;
          this.setState(prevState => ({inventory: {...prevState.inventory, ...ingredient}}))
        })
      })
    })))

  }

  handleOrderChange(salad) {
    let newOrder = this.state.order;
    newOrder.push(salad);
    this.setState({order: newOrder});
    let uploadSalad = JSON.stringify(salad);
    window.localStorage.setItem('Sallad ' + (this.state.order.indexOf(salad) + 1), uploadSalad)
  }

  removeSalad(index) {
    let newOrder = this.state.order;
    newOrder.splice(index, 1);
    this.setState({order: newOrder});
    let uploadSalad = '';
    window.localStorage.clear();
    this.state.order.forEach(e => {
      uploadSalad = JSON.stringify(e);
      window.localStorage.setItem('Sallad ' + (this.state.order.indexOf(e) + 1), uploadSalad)
    });
  }

  render() {
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={this.state.inventory} handleOrderChange={this.handleOrderChange} />;
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
