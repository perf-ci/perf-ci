import React from 'react';
import './App.css';
import Routes from './Routes';
import HttpsRedirect from 'react-https-redirect';
import {AuthenticationService} from './services/AuthenticationService';

// eslint-disable-next-line require-jsdoc

// eslint-disable-next-line no-unused-vars,require-jsdoc
function initServices(props) {
  const _authenticationService = new AuthenticationService();

  return props.services === undefined ?
    {
      get authenticationService() {
        return _authenticationService;
      },
    } :
    props.services;
}

// eslint-disable-next-line require-jsdoc
class App extends React.Component {
  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);

    this.services = initServices(props);
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <HttpsRedirect>
        <div>Blbalba</div>
        <Routes services={this.services}/>
      </HttpsRedirect>
    );
  }
}

export default App;
