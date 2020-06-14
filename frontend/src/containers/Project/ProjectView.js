import React from 'react';
import {Component} from 'react';
import queryString from 'query-string';
import {Button, Item, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {ProjectService} from '../../services/ProjectService';
import {NotificationService} from '../../services/NotificationService';
import {withRouter} from 'react-router-dom';


ProjectView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  services: {
    projectService: PropTypes.instanceOf(ProjectService),
    notificationService: PropTypes.instanceOf(NotificationService),
  },
};


// eslint-disable-next-line require-jsdoc
class ProjectView extends Component {
  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: '',
      api_token: '',
      showDeleteConfirmation: false,
    };

    this.updateProjectInfo = (id) => this.props.services.projectService.get(id)
        .then((data) => {
          this.setState(data);
        })
        .catch((data) => {
          this.props.services
              .notificationService.notifyError(data['message']);
          this.props.history.push('/dashboard');
        });

    const searchUrl = queryString.parse(props.location.search);
    this.updateProjectInfo(searchUrl.id);

    this.deleteProject = () => {
      props.services.projectService.delete(this.state.id).then((data)=> {
        this.setState({showDeleteConfirmation: false});
        props.services.notificationService.notifySuccess(data['message']);
        props.history.push('/dashboard');
      }).catch((data) => {
        props.services.notificationService.notifyError(data['message']);
      });
    };
  }

  // eslint-disable-next-line react/no-deprecated,require-jsdoc
  componentWillReceiveProps(nextProps) {
    const searchUrl = queryString.parse(nextProps.location.search);
    if (this.state.id !== searchUrl.id) {
      this.updateProjectInfo(searchUrl.id);
    }
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <div>
        <Item.Group>
          <Item>
            <Item.Content verticalAlign=''>
              <Item.Header>
                {this.state.name}
              </Item.Header>
              <Item.Description>
                API token {this.state.api_token}
              </Item.Description>
              <Item.Extra>
                <Button
                  color='red'
                  onClick={() => this.setState({showDeleteConfirmation: true})}
                  content='Delete'/>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>

        <Modal
          open={this.state.showDeleteConfirmation}
        >
          <Modal.Header>Delete project {this.state.name}</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete the project</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => this.setState({showDeleteConfirmation: false})}
              negative
              content='No'/>
            <Button
              onClick={this.deleteProject}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ProjectView);
