import React, {Component} from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import userLocation from '../../assets/pin.png';
import './BaseMap.css';

class BaseMap extends Component{
  //state holds the data for the map. initial coordinates have been given
  state = {
    viewport: {
       width: "100vw",
       height: "100vh",
       latitude: 12.9716,
       longitude: 77.5946,
       zoom: 12
     },
    userLocation: {} //to hold the user location
  };

//this function is fired when user click the my location button
setUserLocation = () => {
  //using browser geolocation api to get current position
  navigator.geolocation.getCurrentPosition(position => {
    //storing the latitute and longitude
     let setUserLocation = {
         lat: position.coords.latitude,
         long: position.coords.longitude
      };
      //creating a new viewport with updated coordinates
     let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10
      };
      //updating the state
      this.setState({
        viewport: newViewport,
        userLocation: setUserLocation
     });
  });
};
render(){
  return(
    <>
     <button className="myLocationBtn" onClick={this.setUserLocation}>My Location</button>
     {/*React map  gl component from the proxy library react-map-gl */}
      <ReactMapGL
        {...this.state.viewport}
        mapStyle='mapbox://styles/floraisondev/ckjsrhx6x04z719mq9pfxtykc'
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken = "pk.eyJ1IjoiZmxvcmFpc29uZGV2IiwiYSI6ImNranNpbXJjNzN6dnQyeG83d2x2NDh0cXUifQ.Zeawqb7brV1pCF7tjSCe5Q"
      >
        {/*if userLocation is not null, pass those coordinates to Marker component */}
      {Object.keys(this.state.userLocation).length !== 0 ? (
        <Marker
          latitude={this.state.userLocation.lat}
          longitude={this.state.userLocation.long}
        >
          {/*setting an img as a marker*/}
          <div><img src={userLocation} alt=""></img></div>
        </Marker>
      ) : ( 
      
        <div></div>   /*if userLocation is null, do nothing */
      )}
      </ReactMapGL>
      </>
  )}
}

export default BaseMap;































