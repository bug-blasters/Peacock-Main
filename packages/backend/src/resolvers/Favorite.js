function user(parent, args, context, info) {
  return context.prisma.favorite({ id: parent.id }).user();
}

function project(parent, args, context, info) {
  return context.prisma.favorite({ id: parent.id }).project();
}

module.exports = {
  project,
  user
};
