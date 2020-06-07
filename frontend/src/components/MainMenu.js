import React, {Component} from 'react';
import {Button, Menu} from 'semantic-ui-react';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {activeItem: 'home'};
    this.handleItemClick = (e, {name}) => this.setState({activeItem: name});
    this.loginWithGithub = (e) => {
      props.services.authenticationService.login();
    };
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

        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary>
              <a href="/github/login"> Login with Github </a>
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>);
  }
}
