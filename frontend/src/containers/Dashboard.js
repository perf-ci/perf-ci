import React from 'react';
import './Dashboard.css';
import {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import Roller from '../components/Roller.js';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import AddProjectForm from './Project/AddProjectForm';


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
      <div className="Dashboard">

      </div>
    );
  }
}
