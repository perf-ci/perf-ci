import React, {Component} from 'react';
import {Button, Menu} from 'semantic-ui-react';

// eslint-disable-next-line require-jsdoc
export default class MainMenu extends Component {
  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    props.services.authenticationService.onChange((user) => {
      this.setState({
        user: user,
      });
    });

    this.state = {
      activeItem: 'home',
      user: null,
    };

    this.handleItemClick = (e, {name}) => this.setState({activeItem: name});
    // eslint-disable-next-line react/prop-types
    this.handleLogout = (e) => props.services.authenticationService.logout();
  }

  render() {
    const {activeItem} = this.state;
    return (
      <Menu size='massive'>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />


        {this.state.user !== null ?
          <Menu.Menu position='right'>
            <Menu.Item>
              {this.state.user.login}
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
      </Menu>);
  }
}
