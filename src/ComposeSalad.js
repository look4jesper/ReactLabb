import React from "react";
import Salad from "./salad.js";

class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation: {},
      protein: [],
      extras: [],
      dressing: {},
      formErrors: { 
        formSubmitted: false,
        extras: true,
        proteins: true
      }
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleCheckboxInput = this.handleCheckboxInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  handleInput(event) {
    event.target.parentElement.classList.add("was-validated");
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
    if (this.state.extras.length > 15 || this.state.extras.length < 4) {
      this.setState(prevState => ({...prevState, formErrors: {...prevState.formErrors, extras: true}
      }))
    } else {
      this.setState(prevState => ({...prevState, formErrors: {...prevState.formErrors, extras: false}
      }))
    }
    if (this.state.protein.length > 2 || this.state.protein.length < 1) {
        this.setState(prevState => ({...prevState, formErrors: {...prevState.formErrors, proteins: true}
        }))
      } else {
        this.setState(prevState => ({...prevState, formErrors: {...prevState.formErrors, proteins: false}
        }))
      }
  }
  
  handleSubmit(event) {
      event.preventDefault();
      event.target.classList.add("was-validated");
      


      if(event.target.checkValidity() === false){
        this.setState(prevState => ({
          ...prevState,
          formErrors: { 
            ...prevState.formErrors,
            formSubmitted: true
          }
        }));
        
      } else if (this.state.formErrors.proteins === true || this.state.formErrors.extras === true) {
        this.setState(prevState => ({
          ...prevState,
          formErrors: { 
            ...prevState.formErrors,
            formSubmitted: true
          }
        }));
      } else {

      let submitSalad = new Salad();
      submitSalad.addFoundation(this.state.foundation);
      this.state.protein.forEach(e => submitSalad.addProtein(e));
      this.state.extras.forEach(e => submitSalad.addExtra(e));
      submitSalad.addDressing(this.state.dressing);

      this.setState(prevState => ({
        foundation: {},
        protein: [],
        extras: [],
        dressing: {},
        formErrors: { 
          ...prevState.formErrors,
          formSubmitted: true
        }
      }));

      document.querySelector('form[name=saladForm').reset();
      
      this.props.handleOrderChange(submitSalad);

      this.props.history.push('/view-order');
    }
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
      <form name="saladForm" onSubmit={this.handleSubmit} noValidate>
        <div className="form-group">
          <h5>
            Välj bas: 
          </h5>          
          <select className="form-control" name='foundation' value={this.state.foundation.name} required onChange={this.handleInput}>
              <option value={''}>Välj en bas</option>
              {foundations.map(name => (
                <option key={name} value={name}>{name + ' (+' + inventory[name].price + ' kr) '}</option>
              ))}
          </select>
          <div className="invalid-feedback">Du måste välja en bas!</div>
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
              <label className="form-check-label text-reset">{name + ' (+' + inventory[name].price + ' kr) '}</label>
            </div>
          ))}
          <div className="alert alert-danger w-25" role="alert" hidden={!(this.state.formErrors.formSubmitted && this.state.formErrors.proteins)}>
            Du måste välja 1 eller 2 protein!
          </div>
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
              <label className="form-check-label text-reset">{name + ' (+' + inventory[name].price + ' kr) '}</label>
            </div>
          ))}
          <div className="alert alert-danger w-25" role="alert" hidden={!(this.state.formErrors.formSubmitted && this.state.formErrors.extras)}>
            Du måste välja minst 4 och max 15 tillbehör!
          </div>
        </div>

        <div className="form-group">
          <h5>
            Välj dressing: 
          </h5>
          <select className="form-control" name='dressing' value={this.state.dressing.name} required onChange={this.handleInput}>
            <option value={''}>Välj en dressing</option>
            {dressing.map(name => (
              <option key={name} value={name}>{name + ' (+' + inventory[name].price + ' kr) '}</option>
            ))}
          </select>
          <div className="invalid-feedback">Du måste välja en dressing!</div>
        </div>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    );
  }
}

export default ComposeSalad;
