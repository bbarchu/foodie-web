import React from 'react'
import { Link } from 'react-router-dom';

class UsersPage extends React.Component {
 
	state = {
    users: []
  };
  
  componentWillMount() {

    fetch(`http://taller2-back.herokuapp.com/api/admin/users`)
    .then((response) => {
      return response.json()
    }).then( users => this.setState ({users: users}));
  }

    render() {
        return (
          <React.Fragment>
            <h2> Users </h2>
            <Link className="btn btn-primary" to="/add-user">
              Add user
            </Link>
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>surname</th>
                  <th>email</th>
                  <th>phone</th>
                  <th>password</th>
                  <th>role</th>
                  <th>subscription</th>
                  <th>photo_url</th>
                  <th>creation_date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map ( user => {
                  return ( 
                    <tr key={user.id}>
                        <td> {user.id} </td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td>{user.subscription}</td>
                        <td>{user.photo_url}</td>
                        <td>{user.creation_date}</td>
                        <Link className="btn btn-primary" to="/editar-shop">
                        Editar
                        </Link>
                        {" · "}
                        <Link className="btn btn-primary">
                        Borrar
                        </Link>
                        {" · "}
                  </tr>
                );
              })}
              </tbody>
            </table>
          </React.Fragment>
        );
  }
}
export default UsersPage;