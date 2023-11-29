const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const MoviesType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// root query
const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movies: {
      type: MoviesType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {},
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
