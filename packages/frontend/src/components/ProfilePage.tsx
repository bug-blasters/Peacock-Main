import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { SignS3GqlDocument, SignS3GqlMutationFn } from '../generated/graphql';
import PhotoUpload from './PhotoUpload';
import Ribbons from './Ribbons';

import '../scss/App.scss';
import '../scss/ProfilePage.scss';

interface FeaturedProjectProps {
  imageUrl: string;
}

const FeaturedProject = ({ imageUrl }: FeaturedProjectProps) => (
  <div className="featured-project">
    <img src={imageUrl} />
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

const ProfilePage = () => {
  const [isProfileUploadOpen, setProfileUploadOpen] = useState(false);
  return (
    <div className="Profile">
      <div className="cover-photo" />
      <div className="profile-card">
        <Ribbons />
        <div className="profile-image">
          <img src="https://i.imgur.com/aBQQMc6.png" />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setProfileUploadOpen(true)}
        >
          Upload Profile Pic
        </Button>
        <Modal className="modal" open={isProfileUploadOpen}>
          <Mutation mutation={SignS3GqlDocument}>
            {(signS3Mutation: SignS3GqlMutationFn) => (
              <PhotoUpload signS3={signS3Mutation} />
            )}
          </Mutation>
        </Modal>
      </div>
      <div className="project-container">
        <FeaturedProject imageUrl={'https://i.imgur.com/aBQQMc6.png'} />
        <OtherProjects projects={otherProjects} />
      </div>
    </div>
  );
};

export default ProfilePage;
