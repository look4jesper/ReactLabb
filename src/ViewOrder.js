import React from "react";

class ViewOrder extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick=this.handleClick.bind(this);
    }
    
        handleClick(event) {
            const index = event.target.value;
            this.props.removeSalad(index);
        }

        render() {
            const order = this.props.order;
            if (!order) {
                alert("salads is undefined in ViewOrder");
            }

            let keys = [];
            for (let index = 0; index < order.length; index++) {
                keys.push({key: 'Sallad ' + (index + 1), index: index});
            }
           
            return (
                <div>
                    <ul className="list-group">
                        {keys.map(e => 
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={e.key}>
                                <h5>
                                    {e.key + ', ' + order[e.index].toString()}
                                </h5>
                                
                                <span className="badge badge-primary badge-pill ">{order[e.index].price() + ' kr'} 
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm text-danger font-weight-bolder text-align-top text-decoration-none"
                                        value={e.index}
                                        onClick={this.handleClick}
                                    >X
                                    </button>
                                </span>
                                
                                
                            </li>    
                        )}
                    </ul>
                </div>
            );
        }
}
  
export default ViewOrder;