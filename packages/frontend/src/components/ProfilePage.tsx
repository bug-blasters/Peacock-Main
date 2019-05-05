import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import Dropzone, {
  IDropzoneProps,
  IUploadParams,
} from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { Project } from '../generated/graphql';

import '../scss/App.scss';
import '../scss/ProfilePage.scss';

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

const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

const PhotoUpload = () => {
  // add type defs to function props to get TS support inside function bodies,
  // and not just where functions are passed as props into Dropzone
  const getUploadParams: IDropzoneProps['getUploadParams'] = async ({
    meta: { name },
  }) => {
    // const {
    //   fields,
    //   uploadUrl,
    //   fileUrl,
    // } = await myApiService.getPresignedUploadParams(name);
    // return { fields, meta: { fileUrl }, url: uploadUrl };
    return { url: 'https://httpbin.org/post' };
  };

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onSubmit={handleSubmit}
      inputContent="Drop Files (Custom Layout)"
    />
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
        <Modal
          className="modal"
          open={isProfileUploadOpen}
          onBackdropClick={() => setProfileUploadOpen(false)}
        >
          <Paper className="photo-upload-card" elevation={1}>
            <PhotoUpload />
          </Paper>
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
