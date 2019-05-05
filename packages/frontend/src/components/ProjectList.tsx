import { DataProxy } from 'apollo-cache';
import gql from 'graphql-tag';
import * as React from 'react';
import {
  FavoriteGqlMutation,
  Project,
  ProjectListComponent,
  ProjectListQuery,
} from '../generated/graphql';
import ProjectTeaser from './ProjectTeaser';

const ProjectList: React.FunctionComponent = () => (
  <ProjectListComponent>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>Fetching</div>;
      }
      if (error) {
        return <div>Error</div>;
      }

      if (data && data.feed.projects) {
        const projects = data.feed.projects;
        return projects.map(project => (
          <ProjectTeaser
            project={project}
            updateStoreAfterFavorite={updateCacheAfterFavorite}
            numOfFavorites={project.favorites.length}
          />
        ));
      }
    }}
  </ProjectListComponent>
);

const updateCacheAfterFavorite = (
  store: DataProxy,
  favoriteMutationResult: FavoriteGqlMutation,
  projectId: Project['id']
) => {
  const data = store.readQuery<ProjectListQuery>({ query: FEED_QUERY });
  if (data) {
    const favoritedProject = data.feed.projects.find(
      project => project.id === projectId
    );
    if (favoritedProject && favoriteMutationResult.favorite) {
      favoritedProject.favorites =
        favoriteMutationResult.favorite.project.favorites;
    }

    store.writeQuery({ query: FEED_QUERY, data });
  }
};

export const FEED_QUERY = gql`
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

export default ProjectList;
