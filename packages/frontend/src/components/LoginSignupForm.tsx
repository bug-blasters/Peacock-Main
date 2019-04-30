import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
      <Paper elevation={1}>
        <Typography variant="h4" component="h3">
          {login ? 'Login' : 'Sign Up'}
        </Typography>
        <form className="flex flex-column">
          {!login && <TextField label="Name" margin="normal" />}
          <TextField
            label="Email Address"
            type="text"
            placeholder="Your email address"
          />
          <TextField label="Password" type="text" placeholder="Your password" />
          <TextField
            label="Password Confirmation"
            type="text"
            placeholder="Your password"
          />
        </form>
        <div className="flex mt3">
          {login ? (
            <Login variables={{ email, password }}>
              {loginMutation => (
                <Button
                  className="pointer mr2 button"
                  variant="contained"
                  color="primary"
                  onClick={() => loginMutation()}
                >
                  Login
                </Button>
              )}
            </Login>
          ) : (
            <Signup variables={{ email, password, name }}>
              {signupMutation => (
                <Button
                  className="pointer mr2 button"
                  variant="contained"
                  color="secondary"
                  onClick={() => signupMutation()}
                >
                  Signup
                </Button>
              )}
            </Signup>
          )}
          <div
            className="pointer button"
            onClick={() => setState({ ...state, login: !login })}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default LoginSignupForm;
