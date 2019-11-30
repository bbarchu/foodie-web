import React from 'react'
import {Link} from 'react-router-dom';
import url from './common/apilink.json';
import { toast } from 'react-toastify';

class ProductPage extends React.Component {
 
	state = {
    products: []
  };
  
componentWillMount() {
  const { id } = this.props.location.props
  fetch(url.BASE_URL + `/api/shops/${id}/products`)
  .then((response) => {
    return response.json()
  }).then( products => this.setState ({products: products}));
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
        <h2> Products </h2>
        <Link className="btn btn-primary" to={{pathname:"/add-product", props: {id: this.props.location.props.id}}}>
          Add product
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Pertenece al shop </th>
              <th>Id</th>
              <th>Name</th>
              <th>Descripcion</th>
              <th>Category</th>
              <th>Price</th>
              <th>Is active</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map ( product => {
              return ( 
                <tr key={product.id}>
                    <td> { this.props.location.props.id } </td>
                    <td> {product.id} </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td></td>
                    <Link className="btn btn-primary" to={{pathname:"/editar-producto/" + product.id, props: {product: product, shop: this.props.location.props}}}>
                    Editar
                    </Link>
                    <Link className="btn btn-danger" onClick={this.handleClickDelete}>
                    Desactivar
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
export default ProductPage;