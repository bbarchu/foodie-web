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

handleClickDelete(idProduct) {

  let opcion = confirm("Estas seguro que lo quieres desactivar?");
  if (opcion === false) {
    return;
  }
  fetch(url.BASE_URL + '/api/admin/products/'+idProduct, {
    method: 'DELETE',
}).then(() => { 
  toast.success("Se ha desactivado satisfactoriamente!")
  this.componentWillMount()  
})
}


handleClickActive(idProduct) {
  let opcion = confirm("Estas seguro que lo quieres activar?");
  if (opcion === false) {
    return;
  }
  fetch(url.BASE_URL + '/api/admin/products', {
    method: 'PUT',
    body: JSON.stringify({
        id: idProduct,
        active: true
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
                    <td>{this.esActivo(product.active)}</td>
                    <td></td>
                    <Link className="btn btn-primary" to={{pathname:"/editar-producto/" + product.id, props: {product: product, shop: this.props.location.props}}}>
                    Editar
                    </Link>
                    <button className="btn btn-danger" onClick={() => this.handleClickDelete(product.id)} >
                    Desactivar
                    </button>
                    <button className="btn btn-success" onClick={() => this.handleClickActive(product.id)}>
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
export default ProductPage;