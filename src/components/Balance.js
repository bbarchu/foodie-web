import React from 'react'
import url from './common/apilink.json';

class Balance extends React.Component {
 
	state = {
    users: []
  };
  
  componentWillMount() {

    fetch(url.BASE_URL+`/api/admin/users`)
    .then((response) => {
      return response.json()
    }).then( users => this.setState ({users: users}));
  }

 
    render() {
        return (
          <React.Fragment>
            <h2> Balance deliveries </h2>

            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>E-mail</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Subscription</th>
                  <th>Balance
                      <th>Cash</th> <th>Favor</th>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.filter(user => user.role == "delivery")
                .map ( user => {
                  return ( 
                    <tr key={user.id}>
                        <td> {user.id} </td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>
                        <td>{user.subscription}</td>
                        <td><td>{user.cash_balance}</td> <td>{user.favor_balance}</td></td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </React.Fragment>
        );
  }
}
export default Balance;