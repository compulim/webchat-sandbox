import React, { Component } from 'react';
import './App.css';

import { Chat }   from 'botframework-webchat';
import { css }    from 'glamor';
import { fromJS } from 'immutable';

import DirectLineProperties from './DirectLineProperties';

const ROOT_CSS = css({
  display      : 'flex',
  flexDirection: 'column',
  height       : '100%',

  '> .chat-box': {
    flex     : 1,
    marginTop: 10,
    position : 'relative'
  }
});

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleDirectLineChange = this.handleDirectLineChange.bind(this);

    this.state = {
      directLineProperties: fromJS({})
    };
  }

  handleDirectLineChange(directLineProperties) {
    this.setState(() => ({
      directLineProperties: fromJS({
        secret  : directLineProperties.secret,
        userID  : directLineProperties.userID,
        username: directLineProperties.username
      })
    }));
  }

  render() {
    const { directLineProperties } = this.state;

    return (
      <div { ...ROOT_CSS }>
        <DirectLineProperties onChange={ this.handleDirectLineChange } />
        <div className="chat-box">
          {
            !!directLineProperties.get('secret') &&
              <Chat
                directLine={{ secret: directLineProperties.get('secret') }}
                key       ={ directLineProperties.hashCode() }
                user      ={{ id: directLineProperties.get('userID'), name: directLineProperties.get('username') }}
              />
          }
        </div>
      </div>
    );
  }
}

export default App;
