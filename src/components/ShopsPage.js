import React from 'react'
import { Link } from 'react-router-dom';
import url from './common/apilink.json';
import { toast } from 'react-toastify';
import { sortByKey } from './utils';
import Card from 'react-bootstrap/Card';

class ShopsPage extends React.Component {
	state = {
    shops: []
  };

  componentWillMount() {
    fetch(url.BASE_URL + '/api/admin/shops')
    .then((response) => {
      return response.json()
    }).then( shops => this.setState ({shops: shops}));
  }

  handleClickDelete(idShop) {

    let opcion = confirm("Estas seguro que lo quieres desactivar?");
    if (opcion === false) {
      return;
    }
    fetch(url.BASE_URL + '/api/admin/shops/'+idShop, {
      method: 'DELETE',
  }).then(() => { 
    toast.success("Se ha desactivado satisfactoriamente!")
    this.componentWillMount()  
  })
  }
  

  handleClickActive(idShop) {
    let opcion = confirm("Estas seguro que lo quieres activar?");
    if (opcion === false) {
      return;
    }
    fetch(url.BASE_URL + '/api/admin/shops', {
      method: 'PUT',
      body: JSON.stringify({
          id: idShop,
          active: true
      })
    }).then(() => { 
        toast.success("Se ha activado satisfactoriamente!")
        this.componentWillMount()  
      })
  }

  esActivo(activo){
    console.log(activo)
    if(activo){
      return "True";
    }
    else{
      return "False";
    }
  }


    render() {
      var aux = [];
      if (this.state.shops.length > 0) {
        aux = sortByKey(this.state.shops, "id")
      }
        return (
          <React.Fragment>
        
        
        <Card style={{ width: '100em' }} >
        <Card.Body>
          <Card.Title><h2> Shops </h2></Card.Title>
          <Card.Text>
            Clickeando aqui podrás agregar un nuevo shop!
          </Card.Text>
          <Link className="btn btn-primary" to="/add-shop">
          Add shop
        </Link>
        </Card.Body>
      </Card>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Location</th>
              <th>Category</th>
              <th>Active</th>
              <th></th>
              <th></th>
              <th></th>
              
            </tr>
          </thead>
          <tbody>
            {aux.map ( shop => {
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
                <td>{this.esActivo(shop.active)}</td>
                
                <Link className="btn btn-primary" to={{pathname:"/editar-shop/" + shop.id, props: {shop: shop}}}>
                 Editar
                </Link>
                
                <button className="btn btn-danger" onClick={() => this.handleClickDelete(shop.id)} >
                 Desactivar
                </button>
                <button className="btn btn-success" onClick={() => this.handleClickActive(shop.id)}>
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
export default ShopsPage;