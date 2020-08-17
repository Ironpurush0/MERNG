const postsResolver = require("./Posts");
const userResolvers = require("./Users");
const commentResolver = require("./comments");

module.exports = {
  Post: {
    likesCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
  },
  Query: {
    ...postsResolver.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolver.Mutation,
    ...commentResolver.Mutation,
  },
  Subscription: {
    ...postsResolver.Subscription,
  },
};
