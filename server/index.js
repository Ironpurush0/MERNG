const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req })
});

try {
	mongoose
		.connect(MONGODB, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log('Connected to mongodb.');
			return server.listen({ port: 5000 });
		})
		.then((res) => {
			console.log(`Server running at ${res.url}`);
		});
} catch (error) {
	console.log(error.message);
}
