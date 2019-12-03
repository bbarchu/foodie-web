import React from 'react'
import url from './common/apilink.json';
import { sortByKey } from './utils';

class OrdersPage extends React.Component {
	state = {
    orders: [],
    orders_ready: false,
    ready: false
  };

  componentWillMount() {
    fetch(url.BASE_URL + '/api/orders')
    .then((response) => {
      return response.json()
    }).then( orders => this.setState ({orders: orders, orders_ready: true}));
  }


    render() {
      var aux = []
      if (this.state.orders.length > 0) {
        aux = sortByKey(this.state.orders, "id")
      }
        return (
          <React.Fragment>
        <h2> Deliveries Status </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Shop Id</th>
              <th>User Id</th>
              <th>Favor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {aux.map ( delivery => {
              return ( 
                <tr key={delivery.user_id}>
                <td> {delivery.id} </td>
                <td>{delivery.shop_id}</td>
                <td>{delivery.user_id}</td>
                <td>{delivery.favor.toString()}</td>
                <td>{delivery.status}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
        </React.Fragment>
        );
  }
}
export default OrdersPage;