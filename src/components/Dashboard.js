import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import userAvatar from '../assets/profile.png';
import locationPin from '../assets/location-pin.png';
import BaseMap from './Location/BaseMap';
import './dashboard.css'

export default class Dashboard extends Component {
//constuctor to store token for log out functionality
  constructor(props){
    super(props)
    const token = localStorage.getItem('token')
    let loggedIn = true
    if(token == null){
      loggedIn = false
    }

    this.state = {
      loggedIn
    }
  }

  Logout(){
    localStorage.removeItem('token');
  
  }
  render(){
    //if not loggedIn redirect to login page
  if(this.state.loggedIn === false){
    return <Redirect to ='/' />
  }
  else{
    return(
      //Navbar markup
        <>
        
              <Navbar  fixed="top"  expand="lg" className='navStyle'>
              
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Navbar.Brand href="#home"><img src={locationPin} alt="" className='locationPin'></img></Navbar.Brand>
                     <Nav.Link className="navlink" href="#">Your Location</Nav.Link>
                    </Nav>
                    <img src={userAvatar} alt="" className='currentUser'></img>
                   <p className='userName'>{localStorage.getItem('username')}</p>
                
                <Button className="logoutBtn" variant="outline-light" onClick={this.Logout}
                ><Link to="/" className='logoutLink'>Log out</Link></Button>
                
              </Navbar.Collapse>
            
            </Navbar>
          <div className='mapContainer'>
          <BaseMap /> {/* Basemap component*/ }
          </div>
     </>
    )
  }
}
}