const { profilePictureUrlForId } = require('./PathToUserAssets');

function projects(parent, args, context) {
  return context.prisma.user({ id: parent.id }).projects();
}

function profilePictureUrl(parent, args, context) {
  return profilePictureUrlForId(parent.id);
}

module.exports = {
  projects,
  profilePictureUrl,
};
