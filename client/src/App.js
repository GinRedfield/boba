import './App.css';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import 'bulma/css/bulma.min.css';

import Authentication from './Auth';

import Nav from './components/nav'
import Home from './components/home'
// import Spending from './components/spending';
import NotFound from './components/notFound';
import Register from './components/register';
import Login from './components/login';
import Welcome from './components/welcome';
import Account from './components/account';
// import Track from './components/track';

const App = () => {
  
  return (
    <div className='App'>
        <Fragment>
          <Nav/>
          <Routes>
            <Route path="/" element={<Welcome />} />
            
            <Route path="/home" element={<Authentication />} >
              <Route
              path ='/home'
              element = {<Home/>}
              />

            <Route
              path ='/home/account'
              element = {<Account/>}
              />
            </Route>

            <Route
            path="register"
            element = {<Register/>}
            />

            <Route
            path="login"
            element = {<Login/>}
            />
            
            <Route
            path="/*"
            element = {<NotFound/>}
            />
            
          </Routes>
        </Fragment>
      
      
    </div>
  )
}

export default App;
