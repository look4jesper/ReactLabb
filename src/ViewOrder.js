import React from "react";
import Salad from "./salad";


class ViewOrder extends React.Component {
    constructor(props) {
        super(props);
    }
  

  
        render() {
            const inventory = this.props.inventory;
            // test for correct ussage, the parent must send this datastructure
            if (!inventory) {
              alert("inventory is undefined in ComposeSalad");
            }

            let salads = [];
            let myCesarSalad = new Salad();
            myCesarSalad.addFoundation({...inventory.Sallad, name: 'Sallad'});
            myCesarSalad.addProtein({...inventory['Kycklingfilé'], name: 'Kyckling'});
            myCesarSalad.addExtra({...this.props.inventory.Krutonger, name: 'Krutonger'});
            myCesarSalad.addExtra({...this.props.inventory.Tomat, name: 'Tomat'});
            myCesarSalad.addExtra({...this.props.inventory.Parmesan, name: 'Parmesan'});
            myCesarSalad.addDressing({...this.props.inventory.Ceasardressing, name: 'Caesar'});
            salads.push(myCesarSalad);
            salads.push(myCesarSalad);
            salads.push(myCesarSalad);
            //salads = this.props.salads;
            let keys = [];
            for (let index = 0; index < salads.length; index++) {
                keys.push({key: 'Sallad ' + (index + 1), index: index});
            }
            if (!salads) {
                    alert("salads is undefined in ViewOrder");
            }

            return (
                <div>
                    <ul className="list-group">
                        {keys.map(e => 
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={e.key}>
                                <h5>
                                    {e.key + ', ' + salads[e.index].toString()}
                                </h5>
                                <span className="badge badge-primary badge-pill">{salads[e.index].price() + ' kr'}</span>
                            </li>    
                        )}
                    </ul>
                </div>
            );
        }
  }
  
  export default ViewOrder;