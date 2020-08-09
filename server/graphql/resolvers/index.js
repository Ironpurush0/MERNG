const postsResolver = require('./Posts');
const userReolvers = require('./Users');
const commentResolver = require('./comments');

module.exports = {
	Post: {
		likesCount(parent) {
			return parent.likes.length;
		},
		commentCount(parent) {
			return parent.comments.length;
		}
	},
	Query: {
		...postsResolver.Query
	},
	Mutation: {
		...userReolvers.Mutation,
		...postsResolver.Mutation,
		...commentResolver.Mutation
	},
	Subscription: {
		...postsResolver.Subscription
	}
};
