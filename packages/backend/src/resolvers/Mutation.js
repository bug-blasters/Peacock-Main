const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
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
    user
  };
}

function createProject(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createProject({
    title: args.title,
    description: args.description,
    ownedBy: { connect: { id: userId } }
  });
}

function deleteProject(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.deleteProject({
    id: args.id
  });
}

async function favorite(parent, args, context, info) {
  const userId = getUserId(context);

  const projectExists = await context.prisma.$exists.favorite({
    user: { id: userId },
    project: { id: args.projectId }
  });

  if (projectExists) {
    throw new Error(`Already favorited for project: ${args.projectId}`);
  }

  return context.prisma.createFavorite({
    user: { connect: { id: userId } },
    project: { connect: { id: args.projectId } }
  });
}

module.exports = {
  signup,
  login,
  favorite,
  createProject,
  deleteProject
};
