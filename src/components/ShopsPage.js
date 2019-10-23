import React from 'react'







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

  // componentDidMount(){
  //   getCourses().then( shops => this.setState ({shops: shops}));
  // }

    render() {
        return (
          <React.Fragment>
        <h2> Shops </h2>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>address</th>
              <th>location</th>
              <th>category</th>
              <th>creation_date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.shops.map ( shop => {
              return ( 
                <tr>
                <td> {shop.id} </td>
                <th>{shop.name}</th>
                <th>{shop.description}</th>
                <th>{shop.address}</th>
                <th>{shop.location}</th>
                <th>{shop.category}</th>
                <th>{shop.creation_date}</th>
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