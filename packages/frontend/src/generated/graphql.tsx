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
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type Favorite = {
  id: Scalars["ID"];
  project: Project;
  user: User;
};

export type Feed = {
  projects: Array<Project>;
  count: Scalars["Int"];
};

export type Mutation = {
  createProject: Project;
  deleteProject?: Maybe<Project>;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  favorite?: Maybe<Favorite>;
};

export type MutationCreateProjectArgs = {
  title: Scalars["String"];
  description: Scalars["String"];
};

export type MutationDeleteProjectArgs = {
  id: Scalars["ID"];
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationFavoriteArgs = {
  projectId: Scalars["ID"];
};

export type Project = {
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  ownedBy: User;
  favorites: Array<Favorite>;
};

export enum ProjectOrderByInput {
  DescriptionAsc = "description_ASC",
  DescriptionDesc = "description_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC"
}

export type Query = {
  info: Scalars["String"];
  feed: Feed;
  users: Array<User>;
  projects: Array<Project>;
};

export type QueryFeedArgs = {
  filter?: Maybe<Scalars["String"]>;
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<ProjectOrderByInput>;
};

export type Subscription = {
  newProject?: Maybe<Project>;
  newFavorite?: Maybe<Favorite>;
};

export type User = {
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
  projects: Array<Project>;
  favorites: Array<Favorite>;
};
export type ProjectListQueryVariables = {};

export type ProjectListQuery = { __typename?: "Query" } & {
  feed: { __typename?: "Feed" } & Pick<Feed, "count"> & {
      projects: Array<
        { __typename?: "Project" } & Pick<
          Project,
          "id" | "title" | "description"
        > & {
            favorites: Array<
              { __typename?: "Favorite" } & Pick<Favorite, "id">
            >;
          }
      >;
    };
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
      "query"
    >,
    "variables"
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
