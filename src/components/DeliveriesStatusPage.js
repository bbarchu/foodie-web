import React from 'react'
import { Link } from 'react-router-dom';
import url from './common/apilink.json';
class DeliveriesStatusPage extends React.Component {
	state = {
    deliveries: []
  };

  componentWillMount() {
    fetch(url.BASE_URL + '/api/deliveries/status')
    .then((response) => {
      return response.json()
    }).then( deliveries => this.setState ({deliveries: deliveries}));
  }


    render() {
        return (
          <React.Fragment>
        <h2> Deliveries Status </h2>
        <table className="table">
          <thead>
            <tr>
              <th>user_id</th>
              <th>location</th>
              <th>available</th>
              <th>last_updated</th>
            </tr>
          </thead>
          <tbody>
            {this.state.deliveries.map ( delivery => {
              return ( 
                <tr key={delivery.user_id}>
                <td> {delivery.user_id} </td>
                <td>{delivery.location}</td>
                <td>{delivery.available.toString()}</td>
                <td>{delivery.last_updated}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
        </React.Fragment>
        );
  }
}
export default DeliveriesStatusPage;