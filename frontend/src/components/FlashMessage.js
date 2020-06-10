import React, {Component} from 'react';
import {Message} from 'semantic-ui-react';

// eslint-disable-next-line require-jsdoc
export default class FlashMessage extends Component {
  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);

    // eslint-disable-next-line react/prop-types
    props.services.notificationService.onNotified((err, msg) => {
      this.setState({
        notify_err: err,
        notify_msg: msg,
      });
    });

    this.state = {
      notify_err: false,
      notify_msg: '',
    };
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      this.state.notify_msg !== '' ?
        this.state.notify_err ?
          <Message error="true">
            <Message.Header>{this.state.notify_msg}</Message.Header>
          </Message> :
          <Message success="true">
            <Message.Header>{this.state.notify_msg}</Message.Header>
          </Message> :
        <div/>
    );
  }
}
