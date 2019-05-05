import gql from 'graphql-tag';
import React from 'react';
import { AUTH_TOKEN } from '../constants';
import {
  LoginGqlComponent,
  LoginGqlMutation,
  LoginGqlMutationFn,
  LoginGqlMutationVariables,
} from '../generated/graphql';

interface LoginProps {
  variables: LoginGqlMutationVariables;
  children(mutation: LoginGqlMutationFn): JSX.Element;
}

const Login = ({ variables, children }: LoginProps) => (
  <LoginGqlComponent variables={variables} onCompleted={saveUserData}>
    {(mutation: LoginGqlMutationFn) => children(mutation)}
  </LoginGqlComponent>
);

const saveUserData = (data: LoginGqlMutation) => {
  if (data.login) {
    const { token } = data.login;
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    }
  }
};

const LOGIN_MUTATION = gql`
  mutation LoginGql($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default Login;
