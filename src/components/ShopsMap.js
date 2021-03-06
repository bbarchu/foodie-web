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

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: -34.6134406, lng: -58.5137217 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        var location = marker.location
        var coords = location.split(',')
        var lat = parseFloat(coords[0])
        var lng = parseFloat(coords[1])
        return (
          <Marker
            key={marker.name}
            onClick={onClick}
            position={{ lat: lat, lng: lng }}
            options={{icon: "https://mt.google.com/vt/icon/name=icons/spotlight/restaurant_search_L_8x.png&scale=1.5"}}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  <h6>{marker.name}</h6>
                  <p>id: {marker.id}</p>
                </div>
              </InfoWindow>
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class ShopsMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false
    }
  }
  componentDidMount() {
    fetch(url.BASE_URL + "/api/admin/shops")
      .then(r => r.json())
      .then(data => {
        this.setState({ shelters: data })
      })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    //require('dotenv').config();
    var google_url="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places";
    if (typeof process.env.REACT_APP_GOOGLE_API_KEY !== 'undefined') {
        google_url = google_url + `&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    }
    //console.log(process.env.REACT_APP_TEST)
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        googleMapURL={google_url}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}
