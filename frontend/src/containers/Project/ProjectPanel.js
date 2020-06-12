import React from 'react';
import {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import Roller from '../../components/Roller.js';
import PropTypes from 'prop-types';
import {ProjectService} from '../../services/ProjectService';


ProjectPanel.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  services: {
    projectService: PropTypes.instanceOf(ProjectService),
  },
};


// eslint-disable-next-line require-jsdoc
export default class ProjectPanel extends Component {
  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);

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
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <div>
        {this.state.projects !== null ?
          this.renderProjectList() : <Roller/>}
      </div>
    );
  }
}