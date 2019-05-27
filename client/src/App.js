import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppRoute from 'AppRoute';
import { Chat, NotFound, Register, Login, Password } from 'views';
import Auth from './Auth';

class App extends Component {

    constructor(props){
        super(props);
        Auth.init();
    }

    render() {
        return (
           <div id="main-container" className="container-fluid">
               <Router>
                   <Switch>
                       <AppRoute path='/' exact component={Chat} can={Auth.auth} redirect='/login' />
                       <AppRoute path='/password' component={Password} can={Auth.auth} redirect='/login' />
                       <AppRoute path='/password' component={Password} can={Auth.auth} redirect='/login' />
                       <AppRoute path='/register' component={Register} can={Auth.guest} redirect='/' />
                       <AppRoute path='/Login' component={Login} can={Auth.guest} redirect='/' />
                       <AppRoute component={NotFound} />
                   </Switch>
               </Router>
           </div>
        );
    }
}

export default App;
