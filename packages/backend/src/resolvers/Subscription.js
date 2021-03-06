function newProjectSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.project({ mutation_in: ['CREATED'] }).node();
}

const newProject = {
  subscribe: newProjectSubscribe,
  resolve: payload => {
    return payload;
  },
};

function newFavoriteSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe
    .favorite({ mutation_in: ['CREATED'] })
    .node();
}

const newFavorite = {
  subscribe: newFavoriteSubscribe,
  resolve: payload => {
    return payload;
  },
};

module.exports = {
  newProject,
  newFavorite,
};
