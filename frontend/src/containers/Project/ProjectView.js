import React from 'react';
import {Component} from 'react';
import queryString from 'query-string';
import {Item} from 'semantic-ui-react';
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
      <Item.Group>
        <Item>
          <Item.Content verticalAlign=''>
            <Item.Header>
              {this.state.name}
            </Item.Header>
            <Item.Description>
              API token {this.state.api_token}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default withRouter(ProjectView);
