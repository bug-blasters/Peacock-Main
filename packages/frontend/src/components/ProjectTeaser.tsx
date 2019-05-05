import { DataProxy } from 'apollo-cache';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { FetchResult } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import {
  FavoriteGqlComponent,
  FavoriteGqlMutation,
  FavoriteGqlMutationFn,
  Project,
} from '../generated/graphql';
import '../scss/ProjectTeaser.scss';

type UpdateFavorteCallback = (
  store: DataProxy,
  createFavorite: FavoriteGqlMutation,
  projectId: Project['id']
) => void;

type Project_ProjectTeaser = Pick<Project, 'id' | 'title' | 'description'>;

interface Props {
  project: Project_ProjectTeaser;
  updateStoreAfterFavorite: UpdateFavorteCallback;
  numOfFavorites: number;
}

const ProjectTeaser = ({
  project,
  updateStoreAfterFavorite,
  numOfFavorites,
}: Props) => {
  const authToken = useState(localStorage.getItem(AUTH_TOKEN));
  return (
    <div className="project-teaser">
      <div className="teaser-info-text">
        <div>{project.title}</div>
        <div>{project.description}</div>
      </div>
      <div className="teaser-cover-photo">
        <div>A</div>
      </div>
      <div className="teaser-more-photo">
        <div>B</div>
        <div>C</div>
        <div>{numOfFavorites}</div>
        {authToken && (
          <FavoriteGqlComponent
            variables={{ projectId: project.id }}
            update={(
              store: DataProxy,
              { data }: FetchResult<FavoriteGqlMutation>
            ) => data && updateStoreAfterFavorite(store, data, project.id)}
          >
            {(favoriteMutation: FavoriteGqlMutationFn) => (
              <div className="ml1 f11" onClick={() => favoriteMutation()}>
                ▲
              </div>
            )}
          </FavoriteGqlComponent>
        )}
      </div>
    </div>
  );
};

const FAVORITE_MUTATION = gql`
  mutation FavoriteGql($projectId: ID!) {
    favorite(projectId: $projectId) {
      id
      project {
        favorites {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export default ProjectTeaser;
