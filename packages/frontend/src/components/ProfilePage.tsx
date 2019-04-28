import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import { Project } from '../generated/graphql';

import '../styles/ProfilePage.css';
import { Modal } from '@material-ui/core';

import { useDropzone } from 'react-dropzone';

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

const PhotoUpload = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

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
        <Modal open={isProfileUploadOpen}>
          <PhotoUpload />
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
