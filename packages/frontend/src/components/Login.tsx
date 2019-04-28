import { LoginGqlMutationVariables, LoginGqlMutation, LoginGqlComponent, LoginGqlMutationFn } from "../generated/graphql";
import { AUTH_TOKEN } from "../constants";
import gql from 'graphql-tag';

interface LoginProps {
    variables: LoginGqlMutationVariables,
}

const Login: React.FunctionComponent<LoginProps> = ({ variables }) => (
    <LoginGqlComponent
        variables={variables}
        onCompleted={saveUserData}
    >
    {(mutation: LoginGqlMutationFn) => (
        <div className="pointer mr2 button" onClick={() => mutation()}>
        login
        </div>
    )}
    </LoginGqlComponent>
)

const saveUserData = (data: LoginGqlMutation) => {
    if (data.login) {
        const { token } = data.login;
        if (token) { localStorage.setItem(AUTH_TOKEN, token); }
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
