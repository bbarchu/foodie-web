import React from 'react'
import url from './common/apilink.json';
import { toast } from 'react-toastify';

class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            retiro:0
            
        }
        this.handleChangeRetiro = this.handleChangeRetiro.bind(this);
      }

  
  componentWillMount() {

    fetch(url.BASE_URL+`/api/admin/users`)
    .then((response) => {
      return response.json()
    }).then( users_ => this.setState ({...this.state, ...{users: users_}}));
  }

  handleRetiro(userId,cashBalance){
    event.preventDefault();
    console.log(cashBalance, this.state.retiro, userId)
    fetch(url.BASE_URL + `/api/admin/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
            cash_balance: cashBalance - this.state.retiro
        })
    }).then(() => { 
        this.componentWillMount() 
        toast.success("Retiro exitoso");
    }).catch((e) => console.log(e));
}

  handleChangeRetiro({target}){
    console.log(this.state.retiro)
    this.setState({retiro: target.value});
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
                  <th>Subscription</th>
                  <th>Balance
                      <th>Cash</th> <th>Favor</th>
                  </th>
                  <th></th>
                  <th></th>
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
                        <td>{user.subscription}</td>
                        <td><td>{user.cash_balance}</td> <td>{user.favor_balance}</td></td>
                        <td>
                        <form onSubmit={() => this.handleRetiro(user.id,user.cash_balance)}>
                        <table>
                        <tr>
                        <td>Retirar fondo <input type="number" onChange={this.handleChangeRetiro}/> 
                        <td><input type="submit" value="Retirar" className="btn btn-dark"/></td>
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
export default Balance;