import React from "react";
import ComposeSalad from "./ComposeSalad";
import Salad from "./salad";

class ComposeSaladModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salad: Salad
    }
  
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const salad = event.target.state.salad;
    this.setState({salad: salad});
    console.log(this.state.salad);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#ComposeSaladModal"
        >
          Komponera din egen sallad
        </button>
        <div
          className="modal fade"
          id="ComposeSaladModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="composeSaladModalModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="composeSaladModalModalLabel">
                  Komponera din egen sallad
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ComposeSalad inventory={this.props.inventory} onSubmit={this.handleChange} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Stäng fönstret
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComposeSaladModal;