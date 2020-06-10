import React from 'react';
import {Component} from 'react';
import {Button, Menu} from 'semantic-ui-react';
import Roller from '../components/Roller.js';
import FlashMessage from '../components/FlashMessage';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

// eslint-disable-next-line require-jsdoc
export default class MainMenu extends Component {
  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);

    // eslint-disable-next-line react/prop-types
    props.services.projectService.list()
        .then((data) => {
          this.setState({
            projects: data,
          });
        });

    this.state = {
      projects: null,
    };

    this.renderProjectList = () => {
      const projects = [];
      this.state.projects.forEach((proj) => {
        projects.push(
            <Menu.Item> {proj.name} </Menu.Item>,
        );
      });

      return projects;
    };

    this.addProject = (e) => {
      // eslint-disable-next-line react/prop-types
      props.services.projectService.create('Some project')
          .then((data) => {
          // eslint-disable-next-line react/prop-types
            props.services.notificationService.notifySuccess(data['message']);
          })
          .catch((data) => {
          // eslint-disable-next-line react/prop-types
            props.services.notificationService.notifyError(data['message']);
          });
    };
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}> <Menu vertical>
            {this.state.projects !== null ?
              this.renderProjectList() : <Roller/>}
            <Menu.Item>
              <Button onClick={this.addProject}>Add Project</Button>
            </Menu.Item>
          </Menu>
          </Grid.Column>
          <Grid.Column width={9}>
            {/* eslint-disable-next-line react/prop-types */}
            <FlashMessage services={this.props.services}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    );
  }
}
