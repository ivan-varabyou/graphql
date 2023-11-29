const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const movies = [
  {
    id: 1,
    name: "The Shawshank Redemption",
    genre: "Drama",
  },
  {
    id: 2,
    name: "The Godfather",
    genre: "Crime",
  },
  {
    id: "3",
    name: "The Dark Knight",
    genre: "Action",
  },
  {
    id: "4",
    name: "The Dark Knight New",
    genre: "Action New",
  },
];

const MoviesType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
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
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
