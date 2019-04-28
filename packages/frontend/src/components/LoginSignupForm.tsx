import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const LoginSignupForm = () => {
  const [state, setState] = useState({
    email: '',
    login: true,
    name: '',
    password: '',
  });

  const { login, email, password, name } = state;

  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={e => setState({ ...state, name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={e => setState({ ...state, email: e.target.value })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={e => setState({ ...state, password: e.target.value })}
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
          onClick={() => setState({ ...state, login: !login })}
        >
          {login ? 'need to create an account?' : 'already have an account?'}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
