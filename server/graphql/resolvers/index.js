const postsResolver = require('./Posts');
const userReolvers = require('./Users');
const commentResolver = require('./comments');

module.exports = {
	Query: {
		...postsResolver.Query
	},
	Mutation: {
		...userReolvers.Mutation,
		...postsResolver.Mutation,
		...commentResolver.Mutation
	}
};
