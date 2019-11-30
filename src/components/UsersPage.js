import React from 'react'
import { Link } from 'react-router-dom';
import url from './common/apilink.json';
import { toast } from 'react-toastify';

class UsersPage extends React.Component {
 
	state = {
    users: []
  };
  
  componentWillMount() {

    fetch(url.BASE_URL+`/api/admin/users`)
    .then((response) => {
      return response.json()
    }).then( users => this.setState ({users: users}));
  }

  handleClickDelete() {
    //TODO
    let opcion = confirm("Estas seguro que lo quieres desactivar?");
    if (opcion == false) {
      return;
    }
    toast.success("Se ha desactivado satisfactoriamente!")
  }

  handleClickActive(){
    //TODO
    let opcion = confirm("Estas seguro que lo quieres activar?");
    if (opcion == false) {
      return;
    }
    toast.success("Se ha activado satisfactoriamente!")
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
                  <th>Id</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>E-mail</th>
                  <th>Phone</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Subscription</th>
                  <th>Photo_url</th>
                  <th>Creation date</th>
                  <th>Is active</th>
                  <th></th>
                  <th></th>
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
                        <td></td>
                        <Link className="btn btn-primary" to={{pathname:"/editar-user/" + user.id, props: {user: user}}}>
                        Editar                       
                        </Link>
                    
                        <Link className="btn btn-danger" onClick={this.handleClickDelete}>
                        Borrar
                        </Link>
                        <Link className="btn btn-success" onClick={this.handleClickActive}>
                        Activar
                        </Link>
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