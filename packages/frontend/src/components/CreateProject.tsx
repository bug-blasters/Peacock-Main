import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  CreateProjectGqlComponent,
  CreateProjectGqlMutation,
  CreateProjectGqlMutationFn,
  ProjectListQuery,
} from '../generated/graphql';
import { FEED_QUERY } from './ProjectList';

const CreateProject = (props: RouteComponentProps) => {
  const [state, setState] = useState({
    description: '',
    title: '',
  });

  const { description, title } = state;

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={e => setState({ ...state, description: e.target.value })}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={title}
          onChange={e => setState({ ...state, title: e.target.value })}
          type="text"
          placeholder="The title for the link"
        />
      </div>
      <CreateProjectGqlComponent
        onCompleted={() => props.history.push('/')}
        variables={{ description, title }}
        update={updateStore}
      >
        {(postMutation: CreateProjectGqlMutationFn) => (
          <button onClick={() => postMutation()}>Submit</button>
        )}
      </CreateProjectGqlComponent>
    </div>
  );
};

const updateStore = (
  store: DataProxy,
  { data }: FetchResult<CreateProjectGqlMutation>
) => {
  const newData = store.readQuery<ProjectListQuery>({ query: FEED_QUERY });
  if (newData && data) {
    newData.feed.projects.push(data.createProject);
    store.writeQuery({
      data,
      query: FEED_QUERY,
    });
  }
};

const POST_MUTATION = gql`
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

export default CreateProject;
