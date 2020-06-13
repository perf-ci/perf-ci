import React from 'react';
import './App.css';
import Routes from './Routes';
import HttpsRedirect from 'react-https-redirect';
import {withRouter} from 'react-router-dom';
import {AuthenticationService} from './services/AuthenticationService';
import {ProjectService} from './services/ProjectService';
import {NotificationService} from './services/NotificationService';
import {Button, Menu, Container} from 'semantic-ui-react';
import FlashMessage from './components/FlashMessage';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import ProjectPanel from './containers/Project/ProjectPanel';
import AddProjectForm from './containers/Project/AddProjectForm';
import PropTypes from 'prop-types';


App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  services: {
    authenticationService: PropTypes.instanceOf(AuthenticationService),
    projectService: PropTypes.instanceOf(ProjectService),
    notificationService: PropTypes.instanceOf(NotificationService),
  },
};


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
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              {this.state.user !== null ?
                <Menu vertical>
                  <Menu.Item><b>Projects</b></Menu.Item>
                  <ProjectPanel services={this.services}/>
                  <Menu.Item>
                    <AddProjectForm services={this.services}/>
                  </Menu.Item>
                </Menu> :
                <div/>
              }

            </Grid.Column>
            <Grid.Column width={8}>
              <FlashMessage services={this.services}/>
              <Routes services={this.services}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </HttpsRedirect>
    );
  }
}

export default withRouter(App);
