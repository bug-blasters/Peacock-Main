import gql from 'graphql-tag';
import React from 'react';
import { AUTH_TOKEN } from '../constants';
import {
  SignupGqlComponent,
  SignupGqlMutation,
  SignupGqlMutationFn,
  SignupGqlMutationVariables,
} from '../generated/graphql';

interface SignupProps {
  variables: SignupGqlMutationVariables;
  children(mutation: SignupGqlMutationFn): JSX.Element;
}

const Signup = ({ variables, children }: SignupProps) => (
  <SignupGqlComponent variables={variables} onCompleted={saveUserData}>
    {(mutation: SignupGqlMutationFn) => children(mutation)}
  </SignupGqlComponent>
);

const saveUserData = (data: SignupGqlMutation) => {
  if (data.signup) {
    const { token } = data.signup;
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    }
  }
};

const SIGNUP_MUTATION = gql`
  mutation SignupGql($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export default Signup;
