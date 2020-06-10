import React from 'react';
import './App.css';
import Routes from './Routes';
import HttpsRedirect from 'react-https-redirect';
import {withRouter} from 'react-router-dom';
import {AuthenticationService} from './services/AuthenticationService';
import {ProjectService} from './services/ProjectService';
import {NotificationService} from './services/NotificationService';
import {Button, Menu} from 'semantic-ui-react';

// eslint-disable-next-line require-jsdoc

// eslint-disable-next-line no-unused-vars,require-jsdoc
function initServices(props) {
  const _authenticationService = new AuthenticationService();
  const _projectService = new ProjectService();
  const _notificationService = new NotificationService();

  return props.services === undefined ?
    {
      get authenticationService() {
        return _authenticationService;
      },

      get projectService() {
        return _projectService;
      },

      get notificationService() {
        return _notificationService;
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
    // eslint-disable-next-line react/prop-types
    this.services.authenticationService.onChange((user) => {
      if (user !== null) {
        // eslint-disable-next-line react/prop-types
        this.props.history.push('/dashboard');
      } else {
        // eslint-disable-next-line react/prop-types
        this.props.history.push('/');
      }

      this.setState({
        user: user,
      });
    });

    this.state = {
      // eslint-disable-next-line react/prop-types
      user: this.services.authenticationService.user,
    };

    this.handleLogout = (e) => {
      this.services.authenticationService.logout();
      // eslint-disable-next-line react/prop-types
      this.props.history.push('/');
    };
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <HttpsRedirect>
        <Menu size='massive'>
          {this.state.user !== null ?
            <Menu.Menu position='right'>
              <Menu.Item>
                {this.state.user.name}
              </Menu.Item>
              <Menu.Item>
                <Button onClick={this.handleLogout}>Logout</Button>
              </Menu.Item>
            </Menu.Menu> :
            <Menu.Menu position='right'>
              <Menu.Item>
                <a href="/login"> Login with Github </a>
              </Menu.Item>
            </Menu.Menu>
          }
        </Menu>
        <Routes services={this.services}/>
      </HttpsRedirect>
    );
  }
}

export default withRouter(App);
