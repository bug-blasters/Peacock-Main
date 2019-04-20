import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import AUTH_TOKEN from '../constants';
import '../styles/ProjectTeaser.css';

const FAVORITE_MUTATION = gql`
  mutation favorite($portfolioId: ID!) {
    favorite(portfolioId: $portfolioId) {
      id
      portfolio {
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

const ProjectTeaser = ({ project, updateStoreAfterFavorite, favorites }) => {
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
        <div>{favorites.length}</div>
        {authToken && (
          <Mutation
            mutation={FAVORITE_MUTATION}
            variables={{ portfolioId: project.id }}
            update={(store, { data: { favorite } }) =>
              updateStoreAfterFavorite(store, favorite, project.id)
            }
          >
            {favoriteMutation => (
              <div className="ml1 f11" onClick={favoriteMutation}>
                ▲
              </div>
            )}
          </Mutation>
        )}
      </div>
    </div>
  );
};
export default ProjectTeaser;
