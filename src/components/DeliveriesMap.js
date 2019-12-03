import React, { Component } from "react"
import { compose } from "recompose"
import url from './common/apilink.json';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const icon_available = "https://mt.google.com/vt/icon?psize=30&font=fonts/arialuni_t.ttf&color=ff304C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=•"
const icon_busy = "https://mt.google.com/vt/icon?psize=30&font=fonts/arialuni_t.ttf&color=ff304C13&name=icons/spotlight/spotlight-waypoint-b.png&ax=43&ay=48&text=•"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: -34.6134406, lng: -58.5137217 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        var icon = null
        if (marker.available) {
          icon = icon_available
        } else {
          icon = icon_busy
        }
        return (
          <Marker
            key={marker.user_id}
            onClick={onClick}
            position={{ lat: marker.lat, lng: marker.lng }}
            options={{icon: icon}}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  <h6>{marker.name}</h6>
                  <p>id: {marker.user_id}</p>
                  <p>Last Updated: {marker.last_updated}</p>
                  <p>Disponible: {marker.available.toString()}</p>
                </div>
              </InfoWindow>
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
    fetch(url.BASE_URL + "/api/deliveries/status")
      .then(r => r.json())
      .then(data => {
        this.setState({ deliveries: data, deliveries_ready: true })
      })
    fetch(url.BASE_URL + "/api/admin/users")
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
    var google_url="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places";
    if (typeof process.env.REACT_APP_GOOGLE_API_KEY !== 'undefined') {
        google_url = google_url + `&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    }
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.deliveries}
        onClick={this.handleClick}
        googleMapURL={google_url}
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
