import React from 'react'
import url from './common/apilink.json';
import { sortByKey } from './utils';
import ReactModal from 'react-modal';
import './Modal.css'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import { compose } from "recompose"
import Card from 'react-bootstrap/Card';


const icon_available = "https://mt.google.com/vt/icon?psize=30&font=fonts/arialuni_t.ttf&color=ff304C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=•"
const icon_busy = "https://mt.google.com/vt/icon?psize=30&font=fonts/arialuni_t.ttf&color=ff304C13&name=icons/spotlight/spotlight-waypoint-b.png&ax=43&ay=48&text=•"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={11} defaultCenter={{ lat: -34.6134406, lng: -58.5137217 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        var location = marker.location
        var coords = location.split(',')
        var lat = parseFloat(coords[0])
        var lng = parseFloat(coords[1])
        var icon = null
        if (marker.available) {
          icon = icon_available
        } else {
          icon = icon_busy
        }
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: lat, lng: lng }}
            options={{icon: icon}}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  <h6>{marker.name}</h6>
                </div>
              </InfoWindow>
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

const display = {
    display: 'block'
  };
  const hide = {
    display: 'none'
  };
  
class OrdersPage extends React.Component {
	state = {
    orders: {},
    orders_ready: false,
    shops: {},
    shops_ready: false,
    users: {},
    users_ready: false,
    ready: false,
    showModal: false,
    activeShop: null,
    activeUser: null,
    activeDelivery: null,
  };

  constructor() {
      super();
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleOpenUser = this.handleOpenUser.bind(this);
  }

  componentWillMount() {
    fetch(url.BASE_URL + '/api/orders')
    .then((response) => {
      return response.json()
    }).then( orders => {
      var aux = {};
      orders.map(order => { aux[order.id]=order });
      this.setState ({orders: aux, orders_ready: true})
    });

    fetch(url.BASE_URL + '/api/shops')
    .then((response) => {
      return response.json()
    }).then( shops => {
      var aux = {};
      shops.map(shop => { aux[shop.id]=shop });
      this.setState ({shops: aux, shops_ready: true})
    });

    // Hago el fetch de usuarios
    fetch(url.BASE_URL + '/api/admin/users')
    .then((response) => {
      return response.json()
    }).then( users => {
      var aux = {};
      users.map(user => { aux[user.id]=user });
      this.setState ({users: aux, users_ready: true})
    });
  }

  handleOpenModal(e, row) {
      console.log("Apreté un bonton ");
      console.log(this.state.shops[row.shop_id]);
      //this.setState({showModal: true});
      this.setState({activeShop: row.id});
  }
  handleCloseModal() {
      this.setState({activeShop: null});
  }

  handleOpenUser(row) {
    this.setState({activeUser: row.id});
  }

  shop_data(shop_id) {
    if (this.state.shops_ready) {
      var shop = this.state.shops[shop_id];
      var shops = [shop]
      var google_url="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places";
      if (typeof process.env.REACT_APP_GOOGLE_API_KEY !== 'undefined') {
        google_url = google_url + `&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      }
      return (
        <div>
          <p>{shop.name}</p>
          <p>{shop.description}</p>
          <p>{shop.address}</p>
          <MapWithAMarker
        selectedMarker={shop}
        markers={shops}
        onClick={(marker, event) => null}
        googleMapURL={google_url}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
        </div>
        
      )
      } else {
        return (null)
      }
  }

  aux_delivery(order) {
    if (order.delivery_id) {
      return (
        <button onClick={() => this.setState({activeDelivery: order.id})}>{order.delivery_id}</button>
      )
    } 
  }

  show_user_data(user_id){
    if (this.state.users_ready) {
      var user = this.state.users[user_id]
      return (
        <div>
          <p>{user.name + " " + user.surname}</p>
          <p>Subscription: {user.subscription}</p>
          <p>Reputation: {user.reputation}</p>
        </div>
      )
    }
  }

  show_delivery_data(delivery_id){
    if (this.state.users_ready) {
      console.log("Delivery id: " + delivery_id)
      var user = this.state.users[delivery_id]
      return (
        <div>
          <p>{user.name + " " + user.surname}</p>
          <p>Reputation: {user.reputation}</p>
        </div>
      )
    }
  }

    render() {
      var aux = Object.values(this.state.orders)
      if (aux.length > 0) {
        aux = sortByKey(Object.values(aux), "id")
      }
      return (
          <React.Fragment>
        <Card style={{ width: '100em' }} >
					<Card.Body>
						<Card.Title><h2> Orders Status </h2></Card.Title>
					
					</Card.Body>
				</Card>
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Shop Id</th>
              <th>User Id</th>
              <th>Delivery Id</th>
              <th>Favor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {aux.map ( order => {
              return ( 
                <tr key={order.id}>
                <td>{order.id}</td>
                <td><button onClick={e => this.handleOpenModal(e, order)}>{order.shop_id}</button></td>
                <td><button onClick={() => this.setState({activeUser: order.id})}>{order.user_id}</button></td>
                <td>
                  {this.aux_delivery(order)}
                </td>
                <td>{order.favor.toString()}</td>
                <td>{order.status}</td>
                <div>
                <ReactModal 
                        isOpen={this.state.activeShop==order.id}
                        contentLabel="Minimal Modal Example"
                        className="Modal"
                        overlayClassName="Overlay"
                        onRequestClose={this.handleCloseModal}
                    >
                        <div>
                          {this.shop_data(order.shop_id)}
                        </div>
                </ReactModal>
                <ReactModal 
                        isOpen={this.state.activeUser==order.id}
                        contentLabel="Minimal Modal Example"
                        className="Modal"
                        overlayClassName="Overlay"
                        onRequestClose={() => this.setState({activeUser: null})}
                    >
                  {this.show_user_data(order.user_id)}
                </ReactModal>
                <ReactModal 
                        isOpen={this.state.activeDelivery==order.id}
                        contentLabel="Minimal Modal Example"
                        className="Modal"
                        overlayClassName="Overlay"
                        onRequestClose={() => this.setState({activeDelivery: null})}
                    >
                  {order.delivery_id ? this.show_delivery_data(order.delivery_id):null}
                </ReactModal>
                </div>
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