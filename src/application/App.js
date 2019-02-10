import React from "react";
import {Route, BrowserRouter, /*Redirect,*/ Switch} from 'react-router-dom';

import { Header, Footer } from "./library";

import {Purchase} from './components/Purchase';
import {Ticket} from './components/Ticket';
import {Lookup} from './components/Lookup';
import {NotFound} from './components/NotFound';

import {getCookie, eraseCookie} from './functions/cookies';

const App = () => {

  var token = null;
  var id = getCookie('id');

  return (
  <div>
    <Header token={token} id={id} src='/header-logo.png' alt='Logo Image' />
    <BrowserRouter>
      <Switch>

        <Route exact path="/" render={(props) => {
          if (!!id) return(<Ticket />)
          else return(<Purchase {...props} />)
        }}/>

        <Route exact path="/lookup" render={(props) => {
          return(<Lookup {...props} />)
        }}/>

        <Route exact path="/logout" render={(props) => {
          eraseCookie('token');
          eraseCookie('id');
          return(<Purchase {...props} />)
        }}/>
    
        <Route render={(props) => <NotFound {...props} /> } />

      </Switch>
    </BrowserRouter>
    <Footer token={token} src='/footer-logo.png' alt='Logo Image' />
  </div>
)};

export default App;