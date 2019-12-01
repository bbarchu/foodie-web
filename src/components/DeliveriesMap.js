import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: -34.6134406, lng: -58.5137217 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.user_id}
            onClick={onClick}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  <h6>{marker.name}</h6>
                  <p>id: {marker.user_id}</p>
                  <p>Last Updated: {marker.last_updated}</p>
                  <p>Disponible: {marker.available.toString()}</p>
                </div>
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class DeliveriesMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deliveries: [],
      users: [],
      combined_data: [],
      ready: false,
      users_ready: false,
      deliveries_ready: false,
      selectedMarker: false
    }
  }
  componentDidMount() {
    fetch("https://taller2-back.herokuapp.com/api/deliveries/status")
      .then(r => r.json())
      .then(data => {
        this.setState({ deliveries: data, deliveries_ready: true })
      })
    fetch("https://taller2-back.herokuapp.com/api/admin/users")
    .then(r => r.json())
    .then(data => {
    this.setState({ users: data, users_ready: true })
    })
    //this.aux().then(this.setState({ready: true}))
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker });
  }
  update_data(delivery, user) {
    delivery.name = user.name + " " + user.surname;
    delivery.role = user.role;
  }
  aux () {
    this.state.deliveries.map(delivery => {
      this.state.users.map(user => {
        if ( user.id == delivery.user_id) {
          console.log("El delivery id", delivery.user_id, "es el usuario", user);
          this.update_data(delivery, user);
        }
      })
      var coords = delivery.location.split(',')
      delivery.lat = parseFloat(coords[0])
      delivery.lng = parseFloat(coords[1])
    })
    this.setState({ready: true})
  }
  render() {
    if (this.state.ready){
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.deliveries}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
    } else {
      console.log(this.state)
      if (this.state.deliveries_ready && this.state.users_ready) {
        this.aux();
      }
      return(null)
    }
  }
}