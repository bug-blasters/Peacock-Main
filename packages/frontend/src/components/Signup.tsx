import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';
import {
  SignupGqlComponent,
  SignupGqlMutation,
  SignupGqlMutationFn,
  SignupGqlMutationVariables,
} from '../generated/graphql';

interface ISignupProps {
  variables: SignupGqlMutationVariables;
}

const Signup: React.FunctionComponent<ISignupProps> = ({ variables }) => (
  <SignupGqlComponent variables={variables} onCompleted={saveUserData}>
    {(mutation: SignupGqlMutationFn) => (
      <div className="pointer mr2 button" onClick={() => mutation()}>
        create account
      </div>
    )}
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
