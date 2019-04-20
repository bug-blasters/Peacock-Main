import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ProjectTeaser from './ProjectTeaser';

const ProjectList = ({ children }) => (
  <Query query={FEED_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>;
      if (error) return <div>Error</div>;

      const projects = data.feed.projects;
      console.log(projects);
      return projects.map(project => (
        <ProjectTeaser
          project={project}
          updateStoreAfterFavorite={_updateCacheAfterFavorite}
          favorites={project.favorites}
        />
      ));
    }}
  </Query>
);

const _updateCacheAfterFavorite = (store, createFavorite, projectId) => {
  const data = store.readQuery({ query: FEED_QUERY });

  const favoritedProject = data.feed.projects.find(
    project => project.id === projectId
  );
  favoritedProject.favorites = createFavorite.project.favorites;

  store.writeQuery({ query: FEED_QUERY, data });
};

export const FEED_QUERY = gql`
  {
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

export default ProjectList;
