import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ProjectTeaser from './ProjectTeaser';

const ProjectList = ({ children }) => (
  <Query query={FEED_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>;
      if (error) return <div>Error</div>;

      const projects = data.feed.portfolios;

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

const _updateCacheAfterFavorite = (store, createFavorite, portfolioId) => {
  const data = store.readQuery({ query: FEED_QUERY });

  const favoritedPortfolio = data.feed.portfolios.find(
    portfolio => portfolio.id === portfolioId
  );
  favoritedPortfolio.favorites = createFavorite.portfolio.favorites;

  store.writeQuery({ query: FEED_QUERY, data });
};

const FEED_QUERY = gql`
  {
    feed {
      count
      portfolios {
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
