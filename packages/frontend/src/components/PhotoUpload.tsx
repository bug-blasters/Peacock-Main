import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SignS3GqlMutationFn } from '../generated/graphql';

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
  const onDrop = useCallback(acceptedFiles => setFile(acceptedFiles[0]), []);
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

export default PhotoUpload;
