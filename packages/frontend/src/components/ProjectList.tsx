import * as React from 'react';
import gql from 'graphql-tag';
import ProjectTeaser from './ProjectTeaser';
import { Project, ProjectListComponent, Favorite } from '../generated/graphql'

const ProjectList: React.FunctionComponent = () => (
  <ProjectListComponent>
  {({ loading, error, data }) => {
    if (loading) return <div>Fetching</div>;
    if (error) return <div>Error</div>;

    if (data && data.feed.projects) {
      const projects = data.feed.projects;
      return projects.map(project => (
        <ProjectTeaser
          project={project}
          updateStoreAfterFavorite={_updateCacheAfterFavorite}
          favorites={project.favorites}
        />
      ));
    }
  }}
  </ProjectListComponent>
);

const _updateCacheAfterFavorite = (store: any, createFavorite: Favorite, projectId: Project["id"]) => {
  const data = store.readQuery({ query: FEED_QUERY });

  const favoritedProject = data.feed.projects.find(
    (project: Project) => project.id === projectId
  );
  favoritedProject.favorites = createFavorite.project.favorites;

  store.writeQuery({ query: FEED_QUERY, data });
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
