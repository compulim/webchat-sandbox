import React     from 'react';
import PropTypes from 'prop-types';
import { css }   from 'glamor';

const ROOT_STYLE = css({
  display: 'flex',
  fontFamily: 'Segoe UI',

  '> .form-box': {
    display      : 'flex',
    flex         : 1,
    flexDirection: 'column',
    marginRight  : 10,

    '> label': {
      display: 'flex',

      '&:not(:last-child)': {
        marginBottom: 10
      },

      '> .text': {
        alignSelf: 'center',
        cursor   : 'pointer',
        fontSize : 13,
        width    : 120,

        '& a': {
          color         : 'Black',
          textDecoration: 'none',

          '&:hover': {
            textDecoration: 'underline'
          }
        }
      },

      '> input': {
        backgroundColor: '#EEE',
        borderColor    : 'Transparent',
        borderStyle    : 'solid',
        borderWidth    : 2,
        flex           : 1,
        fontFamily     : 'Segoe UI',
        padding        : 10,

        '&:hover': {
          borderColor: '#CCC'
        }
      }
    },
  },

  '> input[type="submit"]': {
    backgroundColor: '#EEE',
    borderColor    : 'Transparent',
    borderStyle    : 'solid',
    borderWidth    : 2,
    paddingLeft    : 20,
    paddingRight   : 20,

    '&:not(:disabled)': {
      cursor         : 'pointer',

      '&:hover': {
        backgroundColor: '#999',
        color          : 'White'
      }
    },

    '&:disabled': {
      backgroundColor: 'White',
      color          : '#CCC',
      borderColor    : '#EEE'
    }
  }
});

const DIRECT_LINE_SECRET_LOCAL_STORAGE_KEY = 'directLineProps.secret';

export default class DirectLineProperties extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSecretChange   = this.handleSecretChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleUserIDChange   = this.handleUserIDChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);

    this.state = {
      secret  : localStorage.getItem(DIRECT_LINE_SECRET_LOCAL_STORAGE_KEY),
      userID  : 'johndoe',
      username: 'John Doe'
    };
  }

  componentDidMount() {
    this.emitChange();
  }

  emitChange(state = this.state) {
    const { secret, userID, username } = state;

    this.props.onChange({ secret, userID, username });
  }

  handleSecretChange(evt) {
    const nextSecret = evt.target.value;

    this.setState(() => ({ secret: nextSecret }));
  }

  handleSubmit(evt) {
    evt.preventDefault();

    localStorage.setItem(DIRECT_LINE_SECRET_LOCAL_STORAGE_KEY, this.state.secret);
    this.emitChange();
  }

  handleUserIDChange(evt) {
    const nextUserID = evt.target.value;

    this.setState(() => ({ userID: nextUserID }));
  }

  handleUsernameChange(evt) {
    const nextusername = evt.target.value;

    this.setState(() => ({ username: nextusername }));
  }

  render() {
    return (
      <form { ...ROOT_STYLE } onSubmit={ this.handleSubmit }>
        <div className="form-box">
          <label>
            <span className="text">
              Direct Line secret
              <br />
              <small>
                (<a href="https://dev.botframework.com/bots" rel="noopener noreferrer" target="_blank">Get one here</a>)
              </small>
            </span>
            <input
              name    ="directline-secret"
              onChange={ this.handleSecretChange }
              type    ="text"
              value   ={ this.state.secret }
            />
          </label>
          <label>
            <span className="text">User ID</span>
            <input
              onChange={ this.handleUserIDChange }
              type    ="text"
              value   ={ this.state.userID }
            />
          </label>
          <label>
            <span className="text">Username</span>
            <input
              onChange={ this.handleUsernameChange }
              type    ="text"
              value   ={ this.state.username }
            />
          </label>
        </div>
        <input
          disabled={ !this.state.secret }
          type    ="submit"
          value   ="Update"
        />
      </form>
    );
  }
}

DirectLineProperties.defaultProps = {
  onChange: () => 0
};

DirectLineProperties.propTypes = {
  onChange: PropTypes.func
};
