const { getUserId } = require('../utils');

async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { title_contains: args.filter },
        ],
      }
    : {};
  const projects = await context.prisma.projects({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });
  const count = await context.prisma
    .projectsConnection({
      where,
    })
    .aggregate()
    .count();
  return {
    projects,
    count,
  };
}

function users(parent, args, context, info) {
  return context.prisma.users();
}

function projects(parent, args, context, info) {
  return context.prisma.projects();
}

// TODO: only send provide necessary data
function currentUser(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.users({ id: userId });
}

module.exports = {
  feed,
  users,
  projects,
};
