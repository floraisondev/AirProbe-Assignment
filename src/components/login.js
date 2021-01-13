import React, { Fragment, Component } from 'react';
import {Form, Button, Card, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './login.css';
import phone from "../assets/phone.png";
import wave from "../assets/wave-01.png";
import userAvatar from "../assets/profile.png";



  
export default class Login extends Component{
   constructor(props){ //create a constuctor to hold the state and other variables
       super(props)
       const token = localStorage.getItem('token')
         let loggedIn = true //loggedIn  will tell us if an authenticated user has been assigned a token or not
       if(token == null){
        loggedIn = false
    }

    
    this.state = { //state holds the form data and error handling
        username:'',
        password:'',
        loggedIn,
        userNameError : "",
        passwordError: " "
    }

    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
   }
   
   
   onChange(e){ //setting the form data to the state
       this.setState({
           [e.target.name] : e.target.value
       })
   } 

   validate =() =>{ //for validation of form fields
     let userNameError = "";
     let passwordError ="";

     if(this.state.username.length < 3){
         userNameError = "Invalid Username"
     }
     if(userNameError){
         this.setState({userNameError : userNameError})
         return false
     }

     if(this.state.password.length < 6){
         passwordError = "Invalid Password"
         
     }

     if(passwordError){
         this.setState({passwordError:passwordError})
         return false
     }
     return true;
   }

   submitForm(e){ //handling form submit
       e.preventDefault()
       const { username, password } = this.state
       const isValid = this.validate();
       if(isValid){
       if(username === localStorage.getItem('username') && password === localStorage.getItem('password')){ //if user exists in local storage we assign a token and set loggedIn to true
            localStorage.setItem("token", "dgvdfhbfdgvsdxgbgfnbdfxcb")
              this.setState({
                loggedIn:true
           })
       }

       this.setState({userNameError : "",
       passwordError:""}) //clearing the form after hitting submit
    }

    else {
        alert("Invalid credentials") //if username and password are not in the localStorage
    }

 }
   
    render(){
        if(this.state.loggedIn){ //if user is logged in successfully redirect to dashboard
            return <Redirect to='/dashboard' />
        }

             return (
                 //Form markup
                        <>
                        <div className="wrapper">
                        <img src={wave} className='wave' alt=""></img>
                        
                
                    
                    <Container className="d-flex align-items-center justify-content-center" style={{minHeight : '100vh' }}>
                    <div class="img">
                            <img src={phone} alt=""></img>
                            </div>
                        <div className="w-100" style={{ maxWidth: '400px'}}>
                                <Card className="Card">
                                    <Card.Body>
                                        <h2 className='text-center mb-4'>LOG IN</h2>
                        
                        <img src={userAvatar} alt="" className= 'rounded mx-auto d-block avatar'></img>

                        <Form onSubmit={this.submitForm}>

                            <Form.Group id='username'>
                                <Form.Label>Username<sup>*</sup></Form.Label>
                                <Form.Control
                                 type='text' placeholder='Username (more than three characters)' name='username' value={this.state.userName}
                                 onChange={this.onChange} 
                                ></Form.Control>
                                <div style={{fontSize: 11, color : 'red'}}>{this.state.userNameError}</div>
                            </Form.Group>

                            <Form.Group id='password'>
                                <Form.Label>Pasword<sup>*</sup></Form.Label>
                                <Form.Control type='password'
                                placeholder='Password (atleast six characters)'
                                name='password'
                                value={this.state.password}
                                onChange = {this.onChange}
                                ></Form.Control>
                                <div style={{fontSize: 11, color : 'red'}}>{this.state.passwordError}</div>
                            </Form.Group>

                        
                            <Button className="w-100 loginBtn" type='submit'>Log in</Button>
                        </Form>
                    </Card.Body>
                    <div className='w-100 text-center mt-2 mb-4'> 
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
                </Card>
               
                </div>

</Container>
</div>
       </>
    )
        
}
     
}
       
      
 
