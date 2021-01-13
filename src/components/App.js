import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom" 
import Signup from './signup';
import Login from './login'
import Dashboard from './Dashboard';
function App() {
 return(

       <Router>
        <Switch>
         
          <Route exact path="/dashboard"  component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/"   component={Login} />
          </Switch> 
       </Router>
     
 
 ) 
}

export default App;
