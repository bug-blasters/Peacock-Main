import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import '../styles/App.css';

const LoginSignupForm = () => {
  const [state, setState] = useState({
    email: '',
    login: true,
    name: '',
    password: '',
  });

  const { login, email, password, name } = state;

  return (
    <Paper className="login-signup-modal" elevation={1}>
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
                variant="contained"
                color="primary"
                onClick={() => signupMutation()}
              >
                Signup
              </Button>
            )}
          </Signup>
        )}
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => setState({ ...state, login: !login })}
        >
          {login ? 'need to create an account?' : 'already have an account?'}
        </Button>
      </div>
    </Paper>
  );
};

export default LoginSignupForm;
