const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');
const {
  baseUrl,
  s3Bucket,
  profilePicturePathForId,
} = require('./PathToUserAssets');
const AWS = require('aws-sdk');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  console.log(args);
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

function createProject(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createProject({
    title: args.title,
    description: args.description,
    ownedBy: { connect: { id: userId } },
  });
}

function deleteProject(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.deleteProject({
    id: args.id,
  });
}

async function favorite(parent, args, context, info) {
  const userId = getUserId(context);

  const projectExists = await context.prisma.$exists.favorite({
    user: { id: userId },
    project: { id: args.projectId },
  });

  if (projectExists) {
    throw new Error(`Already favorited for project: ${args.projectId}`);
  }

  return context.prisma.createFavorite({
    user: { connect: { id: userId } },
    project: { connect: { id: args.projectId } },
  });
}

async function signS3(parent, { filename, filetype }, context, info) {
  const s3Client = new AWS.S3({
    signatureVersion: 'v4',
    region: 'us-east-2',
  });

  const profilePicturePath = profilePicturePathForId(getUserId(context));

  const s3Params = {
    Bucket: s3Bucket,
    Key: profilePicturePath,
    Expires: 60,
    ContentType: filetype,
    ACL: 'bucket-owner-full-control',
  };

  const signedRequest = await s3Client.getSignedUrl('putObject', s3Params);
  const url = baseUrl + profilePicturePath;

  return {
    signedRequest,
    url,
  };
}

module.exports = {
  signS3,
  signup,
  login,
  favorite,
  createProject,
  deleteProject,
};
