import React from 'react'
import url from './common/apilink.json';
import { sortByKey } from './utils';
import Card from 'react-bootstrap/Card';

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
      var aux = []
      if (this.state.deliveries.length > 0) {
        aux = sortByKey(this.state.deliveries, "user_id")
      }
        return (
          <React.Fragment>
        
        <Card style={{ width: '100em' }} >
					<Card.Body>
						<Card.Title><h2> Deliveries Status </h2></Card.Title>
					
					</Card.Body>
				</Card>
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
            {aux.map ( delivery => {
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