import React from 'react'
import { Link } from 'react-router-dom';

class ShopsPage extends React.Component {
	state = {
    shops: []
  };

  componentWillMount() {
    fetch('http://taller2-back.herokuapp.com/api/shops')
    .then((response) => {
      return response.json()
    }).then( shops => this.setState ({shops: shops}));
  }


    render() {
        return (
          <React.Fragment>
        <h2> Shops </h2>
        <Link className="btn btn-primary" to="/shop">
          Add shop
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>address</th>
              <th>location</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.shops.map ( shop => {
              return ( 
                <tr key={shop.id}>
                <td> {shop.id} </td>
                <td>
                <Link to={{pathname:"/shop/" + shop.id, props: {id: shop.id}}}>{shop.name}</Link>
                </td>
                <td>{shop.description}</td>
                <td>{shop.address}</td>
                <td>{shop.location}</td>
                <td>{shop.category}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
        </React.Fragment>
        );
  }
}
export default ShopsPage;