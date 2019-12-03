import React from 'react'
import url from './common/apilink.json';
import { sortByKey } from './utils';
import ReactModal from 'react-modal';
import './Modal.css'

const display = {
    display: 'block'
  };
  const hide = {
    display: 'none'
  };
  
class OrdersPage extends React.Component {
	state = {
    orders: [],
    orders_ready: false,
    ready: false,
    showModal: false,
    activeRow: null,
  };

  constructor() {
      super();
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    fetch(url.BASE_URL + '/api/orders')
    .then((response) => {
      return response.json()
    }).then( orders => this.setState ({orders: orders, orders_ready: true}));
  }

  handleOpenModal(e, row) {
      console.log("foooo")
      console.log("Apreté un bonton " + e);
      //this.setState({showModal: true});
      this.setState({activeRow: row.id});
  }
  handleCloseModal() {
      this.setState({activeRow: null});
  }


    render() {
      var aux = []
      if (this.state.orders.length > 0) {
        aux = sortByKey(this.state.orders, "id")
      }
      return (
          <React.Fragment>
        <h2> Deliveries Status </h2>
      {/*
        <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           className="Modal"
           overlayClassName="Overlay"
           onRequestClose={this.handleCloseModal}
        >
          <div>モーダル</div>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
      */}
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Shop Id</th>
              <th>User Id</th>
              <th>Favor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {aux.map ( delivery => {
              return ( 
                <tr key={delivery.id}>
                <td>
                    <div>
                    <button onClick={e => this.handleOpenModal(e, delivery)} value={delivery.id}>{delivery.id}</button>
                    <ReactModal 
                        isOpen={this.state.activeRow==delivery.id}
                        contentLabel="Minimal Modal Example"
                        className="Modal"
                        overlayClassName="Overlay"
                        onRequestClose={this.handleCloseModal}
                    >
                        <div>Holaa este es el id {delivery.id}</div>
                    </ReactModal>
                    </div>
                </td>
                <td>{delivery.shop_id}</td>
                <td>{delivery.user_id}</td>
                <td>{delivery.favor.toString()}</td>
                <td>{delivery.status}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
        </React.Fragment>
        );
  }
}
export default OrdersPage;