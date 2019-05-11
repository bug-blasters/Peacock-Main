import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

import '../scss/App.scss';

const LoginSignupForm = () => {
  const [state, setState] = useState({
    email: '',
    login: true,
    name: '',
    password: '',
  });

  const { login, email, password, name } = state;

  const handleChange = (stateAttr: string) => (event: any) => {
    setState({ ...state, [stateAttr]: event.target.value });
  };

  return (
    <Paper className="login-signup-modal" elevation={1}>
      <Typography variant="h4" component="h3">
        {login ? 'Login' : 'Sign Up'}
      </Typography>
      <form className="flex flex-column">
        {!login && (
          <TextField
            onChange={handleChange('name')}
            label="Name"
            margin="normal"
          />
        )}
        <TextField
          onChange={handleChange('email')}
          label="Email Address"
          type="text"
          placeholder="Your email address"
        />
        <TextField
          onChange={handleChange('password')}
          label="Password"
          type="text"
          placeholder="Your password"
        />
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
