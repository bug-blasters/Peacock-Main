import * as React from 'react';
import Login from './Login';
import Signup from './Signup';

export interface ILoginState {
  login: boolean;
  email: string;
  password: string;
  name: string;
}
class LoginSignupForm extends React.PureComponent<{}, ILoginState> {
  state: State = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  };

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          {login ? (
            <Login variables={{ email, password }} />
          ) : (
            <Signup variables={{ email, password, name }} />
          )}
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSignupForm;
