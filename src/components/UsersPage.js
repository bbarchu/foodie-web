import React from 'react'
import { Link } from 'react-router-dom';
import url from './common/apilink.json';
import { toast } from 'react-toastify';
import { sortByKey } from './utils';
import Card from 'react-bootstrap/Card';

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
  
  showRep(rep){
    return (!rep) ? "-" : rep;
  }
    render() {
        var aux = []
        if (this.state.users.length > 0) {
          aux = sortByKey(this.state.users, "id");
        }
        return (
          <React.Fragment>
            
            

            <Card style={{ width: '100em' }} >
            <Card.Body>
              <Card.Title><h2> Users </h2></Card.Title>
              <Card.Text>
                Clickeando aqui podrás agregar un nuevo usuario!
              </Card.Text>
              <Link className="btn btn-primary" to="/add-user">
              Add user
            </Link>
            </Card.Body>
          </Card>
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
                  <th>Reputation</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {aux.map ( user => {
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
                        <td>{this.showRep(user.reputation)}</td>
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