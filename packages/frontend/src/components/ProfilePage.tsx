import React from 'react';
import ReactDOM from 'react-dom';
import { Project } from '../generated/graphql';

import '../styles/ProfilePage.css';

const Ribbon = () => (
  <div className="ribbon">
    <div className="triangle" />
  </div>
);

const Ribbons = () => (
  <div className="ribbon-container">
    <Ribbon />
    <Ribbon />
    <Ribbon />
    <Ribbon />
  </div>
);

interface FeaturedProjectProps {
  imageUrl: string;
}

const FeaturedProject = ({ imageUrl }: FeaturedProjectProps) => (
  <div className="featured-project">
    <img src={imageUrl} />
  </div>
);

interface OtherProjectsProps {
  projects: Array<{ imageUrl: string }>;
}

const OtherProjects = ({ projects }: OtherProjectsProps) => (
  <div className="other-content">
    {projects.map(project => (
      <div>
        <img src={project.imageUrl} />
      </div>
    ))}
  </div>
);

const otherProjects = [
  { imageUrl: 'https://i.imgur.com/aBQQMc6.png' },
  { imageUrl: 'https://i.imgur.com/cxff7sO.png' },
  { imageUrl: 'https://i.imgur.com/aBQQMc6.png' },
  { imageUrl: 'https://i.imgur.com/cxff7sO.png' },
  { imageUrl: 'https://i.imgur.com/aBQQMc6.png' },
  { imageUrl: 'https://i.imgur.com/cxff7sO.png' },
];

const ProfilePage = () => {
  return (
    <div className="Profile">
      <div className="cover-photo" />
      <div className="profile-card">
        <Ribbons />
        <div className="profile-image">
          <img src="https://i.imgur.com/aBQQMc6.png" />
        </div>
      </div>
      <div className="project-container">
        <FeaturedProject imageUrl={'https://i.imgur.com/aBQQMc6.png'} />
        <OtherProjects projects={otherProjects} />
      </div>
    </div>
  );
};

export default ProfilePage;
