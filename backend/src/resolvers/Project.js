function ownedBy(parent, args, context) {
  return context.prisma.project({ id: parent.id }).ownedBy();
}

function favorites(parent, args, context) {
  return context.prisma.project({ id: parent.id }).favorites();
}

module.exports = { ownedBy, favorites };
