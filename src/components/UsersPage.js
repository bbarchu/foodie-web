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

  handleClickDelete(userId) {

    let opcion = confirm("Estas seguro que lo quieres desactivar?");
    if (opcion === false) {
      return;
    }
    fetch(url.BASE_URL + '/api/admin/users/'+userId, {
      method: 'DELETE',
  }).then(() => { 
    toast.success("Se ha desactivado satisfactoriamente!")
    this.componentWillMount()  
  })
  }
  
  
  handleClickActive(userId) {
    console.log(userId)
    let opcion = confirm("Estas seguro que lo quieres activar?");
    if (opcion === false) {
      return;
    }
    fetch(url.BASE_URL + '/api/admin/users/'+userId, {
      method: 'PUT',
      body: JSON.stringify({
          active: true,
      })
    }).then(() => { 
        toast.success("Se ha activado satisfactoriamente!")
        this.componentWillMount()  
      })
  }

  esActivo(activo){
    if(activo){
      return "True";
    }
    else{
      return "False";
    }
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
                        <td>{this.esActivo(user.active)}</td>
                        <Link className="btn btn-primary" to={{pathname:"/editar-user/" + user.id, props: {user: user}}}>
                        Editar                       
                        </Link>
                    
                        <button className="btn btn-danger" onClick={() => this.handleClickDelete(user.id)} >
                        Desactivar
                        </button>
                        <button className="btn btn-success" onClick={() => this.handleClickActive(user.id)}>
                            Activar
                        </button>
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