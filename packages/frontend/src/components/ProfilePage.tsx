import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import {
  Project,
  SignS3GqlComponent,
  SignS3GqlDocument,
  SignS3GqlMutationFn,
  withSignS3Gql,
} from '../generated/graphql';

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

const uploadToS3 = async (file: any, signedRequest: any) => {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
  };
  await axios.put(signedRequest, file, options);
};

const formatFilename = (filename: any) => {
  const date = moment().format('YYYYMMDD');
  const randomString = Math.random()
    .toString(36)
    .substring(2, 7);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
  return newFilename.substring(0, 60);
};

interface PhotoUploadProps {
  signS3: SignS3GqlMutationFn;
}

const PhotoUpload = ({ signS3 }: PhotoUploadProps) => {
  const [file, setFile] = useState<any | null>(null);
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const submit = async () => {
    if (file == null) {
      return;
    }

    const response = await signS3({
      variables: {
        filename: formatFilename(file.name),
        filetype: file.type,
      },
    });

    if (response && response.data) {
      const { signedRequest, url } = response.data.signS3;
      await uploadToS3(file, signedRequest);
    }
    // history.push('/')
  };
  return (
    <Paper className="photo-upload-card" elevation={1}>
      <div {...getRootProps()} className="photo-upload-dropzone">
        <input {...getInputProps()} />
        {isDragActive
          ? 'Drop the files here ...'
          : `Drag 'n' drop some files here, or click to select files`}
      </div>
      <Button onClick={submit}>Submit</Button>
    </Paper>
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
