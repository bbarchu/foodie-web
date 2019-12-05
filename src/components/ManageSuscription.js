import React from 'react';
import url from './common/apilink.json';
import { toast } from 'react-toastify';
import { sortByKey } from './utils';
import manejadorErrores from './common/manejadorErrores';
import Card from 'react-bootstrap/Card';



class ManageSuscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            suscripcion:"flat" 
        }

        this.handleChange = this.handleChange.bind(this);
      }

  
  componentWillMount() {

    fetch(url.BASE_URL+`/api/admin/users`)
    .then((response) => {
      return response.json()
    }).then( users_ => this.setState ({...this.state, ...{users: users_}}));
  }

  handleSuscription(userId){
    event.preventDefault();
    fetch(url.BASE_URL + `/api/admin/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
            subscription: this.state.suscripcion
        })
    }).then((res) => { 
        
        if(res.ok){
          this.componentWillMount() 
          toast.success("Cambio de suscripcion exitosa");
        }
        else {
          manejadorErrores(res.status);
        }
    }).catch((e) => console.log(e));
}

  handleChange({target}){
    
    this.setState({suscripcion: target.value});
  }
 
    render() {
      var aux = []
      if (this.state.users.length > 0) {
        aux = sortByKey(this.state.users, "id")
      }
        return (
          <React.Fragment>
            <Card style={{ width: '100em' }} >
					<Card.Body>
						<Card.Title> <h2> Manage suscriptions </h2></Card.Title>
					
					</Card.Body>
				</Card>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Subscription</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {aux.filter(user => user.role=="user").map ( user => {
                  return ( 
                    <tr key={user.id}>
                        <td> {user.id} </td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.subscription}</td>
                        <td>
                        <form onSubmit={() => this.handleSuscription(user.id)}>
                        <table>
                        <tr>
                        <td>

                            Cambiar suscripcion
                            <select className="form-control" onChange={this.handleChange}>
                                <option value="flat">
                                    Flat
                                </option>
                                <option value="premium">
                                    Premium
                                </option>
                            </select>

                            <td><input type="submit" value="Cambiar!" className="btn btn-dark"/></td>
                        </td>
                        </tr>
                        </table>
                        </form>
                        </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </React.Fragment>
        );
  }
}

export default ManageSuscription;

                        

                                