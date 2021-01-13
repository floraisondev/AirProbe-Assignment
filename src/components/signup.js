import React, {Component} from 'react';
import {Form, Button, Card, Container} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './signup.css';
import mobile from '../assets/undraw_mobile_login_ikmv.png';

 
export default class Signup extends Component{
    //constructor to store state and other variables
constructor(props){ 
    
    super(props)
        this.state = {
                username : '',
                password : '',
                confirmPassword : '',
                isSignedUp : false,
                userNameError : '',
                passwordError : '',
                confirmPasswordError : ''
           }

        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
  }


  //function to store user input in the state
  onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    }
  ) }

//checking validation of the form fields
  validate =() =>{
    let userNameError = "";
    let passwordError ="";
    let confirmPasswordError ="";

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

    if(this.state.password !== this.state.confirmPassword){
        confirmPasswordError = "Passwords do not match"
    }
    if(confirmPasswordError){
        this.setState({confirmPasswordError:confirmPasswordError})
        return false
    }
    return true;
  }


//handling submission of the form
  submitForm(e){
   e.preventDefault();
   const isValid  = this.validate();
  //check whether form is valid
   if(isValid){
  // Check whether the user already exists in the local storage. If yes, we simply do not allow sign up again.
    if (this.state.username === localStorage.getItem('username') && this.state.password === localStorage.getItem('password')){
        alert('Account already exists. Please login with appropriate username and password');
        this.setState({isSignedUp:false})

    } else{
       //save the new user in the localstorage
        localStorage.setItem("token", "dgvdfhbfdgvsdxgbgfnbdfxcb")
        localStorage.setItem('username', this.state.username)
        localStorage.setItem('password', this.state.password)
        this.setState({isSignedUp:true})
        this.setState({userNameError : " ",  passwordError:" ", confirmPasswordError: " "}) //clear form
        alert("Sign up successful!")
     }
   
   
   }
   
}

    render(){
        //if signedUp is true, redirect to dashboard
        if(this.state.isSignedUp){
            return <Redirect to='/dashboard' />
        }
       
    return(
        //Sign up form markup
       <>
       <div className="wrapper">
       <Container className="d-flex align-items-center justify-content-center" style={{minHeight : '100vh' }}>
           <div className="img">
               <img src={mobile} alt=""></img>
           </div>
       <div className="w-100" style={{ maxWidth: '400px'}}>
       <Card className="Card">
        <Card.Body>
            <h2 className='text-center mb-4'>SIGN UP</h2>
           
            <Form onSubmit={this.submitForm}>

                <Form.Group id='username'>
                    <Form.Label>Username<sup>*</sup></Form.Label>

                    <Form.Control
                    type='text'
                    placeholder='Username (atleast three characters)'
                     name='username'
                    onChange={this.onChange} 
                    value={this.state.username}
                    ></Form.Control>
                     <div style={{fontSize: 11, color : 'red'}}>{this.state.userNameError}</div>
                </Form.Group>

                <Form.Group id='password'>
                    <Form.Label>Password<sup>*</sup></Form.Label>
                    <Form.Control
                     type='password'
                     placeholder='Password (atleast 6 characters)'
                    name='password'
                    value = { this.state.password}
                    onChange = {this.onChange}
                    ></Form.Control>
                     <div style={{fontSize: 11, color : 'red'}}>{this.state.passwordError}</div>
                </Form.Group>

                <Form.Group id='password-confirm'>
                    <Form.Label>Confirm Password<sup>*</sup></Form.Label>
                    <Form.Control
                     type='password'
                     placeholder='Confirm Password'
                     name='confirmPassword'
                     value = { this.state.confirmPassword}
                     onChange = {this.onChange}
                    ></Form.Control>
                     <div style={{fontSize: 11, color : 'red'}}>{this.state.confirmPasswordError}</div>
                </Form.Group>
                <Button className="signUpBtn w-100" type='submit'>Sign up</Button>
            </Form>
        </Card.Body>
        <div className='w-100 text-center mt-2 mb-4'> Already have an account? <Link to="/">Log In</Link></div>
       </Card>
       

       </div>

</Container>
</div>
       </>
    )
}

}