import React from "react";
import Salad from "./salad.js";

class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation: {
        foundation: true,
        name: 'Sallad',
        price: 10,
        vegan: true
      },
      protein: [],
      extras: [],
      dressing: {
        dressing: true,
        lactose: true,
        name: 'Ceasardressing',
        price: 5
      },
      salad: Salad
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleCheckboxInput = this.handleCheckboxInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  handleInput(event) {
    const name = event.target.value;
    const type = event.target.name;
    let ingredient = {...this.props.inventory[name], name: name};
    this.setState(prevState => ({...prevState, [type]: {...ingredient}
    }));
  }

  handleCheckboxInput(event) {
    const name = event.target.name;
    let ingredient = {...this.props.inventory[name], name: name, isChecked: true}
    let type;

    if (ingredient.protein === true) {
      type = 'protein';
    } else {
      type = 'extras';
    }
    let newArray = this.state[type];
    if (event.target.checked) {
      if (!newArray.includes(ingredient)) {
        newArray.push(ingredient);
      }
    } else {
      newArray.splice(newArray.indexOf(ingredient), 1);
    }
    this.setState(prevState => ({...prevState, [type]: newArray
    }))
  }
  
  handleSubmit(event) {
    event.preventDefault();

    let submitSalad = new Salad();
    submitSalad.addFoundation(this.state.foundation);
    this.state.protein.forEach(e => submitSalad.addProtein(e));
    this.state.extras.forEach(e => submitSalad.addExtra(e));
    submitSalad.addDressing(this.state.dressing);

    this.setState({foundation: {
        foundation: true,
        name: 'Sallad',
        price: 10,
        vegan: true
      },
      protein: [],
      extras: [],
      dressing: {
        dressing: true,
        lactose: true,
        name: 'Ceasardressing',
        price: 5
      },
      
    });

    document.querySelector('form[name=saladForm').reset();

    alert(submitSalad.toString());
    
    this.props.onOrderChange(submitSalad)

  }

  

  render() {
    const inventory = this.props.inventory;
    // test for correct ussage, the parent must send this datastructure
    if (!inventory) {
      alert("inventory is undefined in ComposeSalad");
    }
    let foundations = Object.keys(inventory).filter(
      name => inventory[name].foundation
    );
    let proteins = Object.keys(inventory).filter(
      name => inventory[name].protein
    );
    let extras = Object.keys(inventory).filter(
      name => inventory[name].extra
    );
    let dressing = Object.keys(inventory).filter(
      name => inventory[name].dressing
    );
    return (
      <form name="saladForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <h5>
            Välj bas: 
          </h5>          
          <select className="form-control" name='foundation' value={this.state.foundation.name} onChange={this.handleInput}>
              {foundations.map(name => (
                <option key={name} value={name}>{name + ' (+' + inventory[name].price + ' kr) '}</option>
              ))}
          </select>
        </div>      
        
        <div className="form-group">
        <h5>
          Välj protein:
        </h5>
          {proteins.map(name => (
            <div className="form-check" key={name}> 
              <input
                className="form-check-input"
                name={name}
                type="checkbox"
                onChange={this.handleCheckboxInput}>
              </input>
              <label className="form-check-label">{name + ' (+' + inventory[name].price + ' kr) '}</label>
            </div>
          ))}
        </div> 

        <div className="form-group">
        <h5>
          Välj tillbehör:
        </h5>
          {extras.map(name => (
            <div className="form-check" key={name}>
              <input
                className="form-check-input"
                name={name}
                type="checkbox"
                onChange={this.handleCheckboxInput}>
              </input>
              <label className="form-check-label">{name + ' (+' + inventory[name].price + ' kr) '}</label>
            </div>
          ))}
        </div>

        <div className="form-group">
          <h5>
            Välj dressing: 
          </h5>
          <select className="form-control" name='dressing' value={this.state.dressing.name} onChange={this.handleInput}>
            {dressing.map(name => (
              <option key={name} value={name}>{name + ' (+' + inventory[name].price + ' kr) '}</option>
            ))}
          </select>
        </div>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    );
  }
}

export default ComposeSalad;
