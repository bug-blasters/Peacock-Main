export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Favorite = {
  id: Scalars['ID'];
  project: Project;
  user: User;
};

export type Feed = {
  projects: Array<Project>;
  count: Scalars['Int'];
};

export type Mutation = {
  createProject: Project;
  deleteProject?: Maybe<Project>;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  favorite?: Maybe<Favorite>;
};

export type MutationCreateProjectArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};

export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationFavoriteArgs = {
  projectId: Scalars['ID'];
};

export type Project = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  ownedBy: User;
  favorites: Array<Favorite>;
};

export enum ProjectOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
}

export type Query = {
  info: Scalars['String'];
  feed: Feed;
  users: Array<User>;
  projects: Array<Project>;
};

export type QueryFeedArgs = {
  filter?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ProjectOrderByInput>;
};

export type Subscription = {
  newProject?: Maybe<Project>;
  newFavorite?: Maybe<Favorite>;
};

export type User = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  projects: Array<Project>;
  favorites: Array<Favorite>;
};
export type CreateProjectGqlMutationVariables = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type CreateProjectGqlMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'Project' } & Pick<
    Project,
    'id' | 'title' | 'description'
  > & { favorites: Array<{ __typename?: 'Favorite' } & Pick<Favorite, 'id'>> };
};

export type LoginGqlMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginGqlMutation = { __typename?: 'Mutation' } & {
  login: Maybe<{ __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'>>;
};

export type ProjectListQueryVariables = {};

export type ProjectListQuery = { __typename?: 'Query' } & {
  feed: { __typename?: 'Feed' } & Pick<Feed, 'count'> & {
      projects: Array<
        { __typename?: 'Project' } & Pick<
          Project,
          'id' | 'title' | 'description'
        > & {
            favorites: Array<
              { __typename?: 'Favorite' } & Pick<Favorite, 'id'>
            >;
          }
      >;
    };
};

export type SignupGqlMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export type SignupGqlMutation = { __typename?: 'Mutation' } & {
  signup: Maybe<{ __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'>>;
};

import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CreateProjectGqlDocument = gql`
  mutation CreateProjectGql($title: String!, $description: String!) {
    createProject(title: $title, description: $description) {
      id
      title
      description
      favorites {
        id
      }
    }
  }
`;

export const CreateProjectGqlComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        CreateProjectGqlMutation,
        CreateProjectGqlMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables: CreateProjectGqlMutationVariables }
) => (
  <ReactApollo.Mutation<
    CreateProjectGqlMutation,
    CreateProjectGqlMutationVariables
  >
    mutation={CreateProjectGqlDocument}
    {...props}
  />
);

export type CreateProjectGqlProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    CreateProjectGqlMutation,
    CreateProjectGqlMutationVariables
  >
> &
  TChildProps;
export type CreateProjectGqlMutationFn = ReactApollo.MutationFn<
  CreateProjectGqlMutation,
  CreateProjectGqlMutationVariables
>;
export function withCreateProjectGql<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CreateProjectGqlMutation,
    CreateProjectGqlMutationVariables,
    CreateProjectGqlProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    CreateProjectGqlMutation,
    CreateProjectGqlMutationVariables,
    CreateProjectGqlProps<TChildProps>
  >(CreateProjectGqlDocument, operationOptions);
}
export const LoginGqlDocument = gql`
  mutation LoginGql($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const LoginGqlComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<LoginGqlMutation, LoginGqlMutationVariables>,
      'mutation'
    >,
    'variables'
  > & { variables: LoginGqlMutationVariables }
) => (
  <ReactApollo.Mutation<LoginGqlMutation, LoginGqlMutationVariables>
    mutation={LoginGqlDocument}
    {...props}
  />
);

export type LoginGqlProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginGqlMutation, LoginGqlMutationVariables>
> &
  TChildProps;
export type LoginGqlMutationFn = ReactApollo.MutationFn<
  LoginGqlMutation,
  LoginGqlMutationVariables
>;
export function withLoginGql<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginGqlMutation,
    LoginGqlMutationVariables,
    LoginGqlProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginGqlMutation,
    LoginGqlMutationVariables,
    LoginGqlProps<TChildProps>
  >(LoginGqlDocument, operationOptions);
}
export const ProjectListDocument = gql`
  query ProjectList {
    feed {
      count
      projects {
        id
        title
        description
        favorites {
          id
        }
      }
    }
  }
`;

export const ProjectListComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<ProjectListQuery, ProjectListQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables?: ProjectListQueryVariables }
) => (
  <ReactApollo.Query<ProjectListQuery, ProjectListQueryVariables>
    query={ProjectListDocument}
    {...props}
  />
);

export type ProjectListProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ProjectListQuery, ProjectListQueryVariables>
> &
  TChildProps;
export function withProjectList<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ProjectListQuery,
    ProjectListQueryVariables,
    ProjectListProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ProjectListQuery,
    ProjectListQueryVariables,
    ProjectListProps<TChildProps>
  >(ProjectListDocument, operationOptions);
}
export const SignupGqlDocument = gql`
  mutation SignupGql($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export const SignupGqlComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<SignupGqlMutation, SignupGqlMutationVariables>,
      'mutation'
    >,
    'variables'
  > & { variables: SignupGqlMutationVariables }
) => (
  <ReactApollo.Mutation<SignupGqlMutation, SignupGqlMutationVariables>
    mutation={SignupGqlDocument}
    {...props}
  />
);

export type SignupGqlProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<SignupGqlMutation, SignupGqlMutationVariables>
> &
  TChildProps;
export type SignupGqlMutationFn = ReactApollo.MutationFn<
  SignupGqlMutation,
  SignupGqlMutationVariables
>;
export function withSignupGql<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SignupGqlMutation,
    SignupGqlMutationVariables,
    SignupGqlProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    SignupGqlMutation,
    SignupGqlMutationVariables,
    SignupGqlProps<TChildProps>
  >(SignupGqlDocument, operationOptions);
}
