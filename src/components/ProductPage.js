import React from 'react'

class ProductPage extends React.Component {
 
	state = {
    products: []
  };
  
componentWillMount() {
  const { id } = this.props.location.props
  //   fetch(`http://taller2-back.herokuapp.com/api/admin/shops/${id}`)


  fetch(`http://taller2-back.herokuapp.com/api/shops/${id}/products`)
  .then((response) => {
    return response.json()
  }).then( products => this.setState ({products: products}));

}


    render() {
        return (
          <React.Fragment>
        <h2> Products </h2>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>category</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map ( product => {
              return ( 
                <tr key={product.id}>
                    <td> {product.id} </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
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