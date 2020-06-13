import React from 'react';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {ProjectService} from '../../services/ProjectService';
import {NotificationService} from '../../services/NotificationService';
import {withRouter} from 'react-router-dom';

AddProjectForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  services: {
    projectService: PropTypes.instanceOf(ProjectService),
    notificationService: PropTypes.instanceOf(NotificationService),
  },
};


// eslint-disable-next-line require-jsdoc
class AddProjectForm extends Component {
  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.handleChange = (e, {name, value}) => this.setState({[name]: value});

    this.handelSubmit = () => {
      this.props.services.projectService.create(this.state.name)
          .then((data) => {
            this.props.services.notificationService
                .notifySuccess(data['message']);
            this.props.history.push(`/projects/?id=${data['id']}`);
          })
          .catch((data) => {
            props.services.notificationService.notifyError(data['message']);
          });
    };
  }

  // eslint-disable-next-line react/require-render-return,require-jsdoc
  render() {
    const {name} = this.state;
    return (
      <Form onSubmit={this.handelSubmit}>
        <Form.Input
          placeholder='Project Name'
          name='name'
          value={name}
          onChange={this.handleChange}/>
        <Button content='Add'/>
      </Form>
    );
  }
}

export default withRouter(AddProjectForm);
