const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const movies = [
  {
    id: 1,
    name: "The Shawshank Redemption",
    genre: "Drama",
    directorId: 1,
  },
  {
    id: 2,
    name: "The Godfather",
    genre: "Crime",
    directorId: 2,
  },
  {
    id: "3",
    name: "The Dark Knight",
    genre: "Action",
    directorId: 3,
  },
  {
    id: "4",
    name: "The Dark Knight New",
    genre: "Action New",
    directorId: 4,
  },
];

const directors = [
  {
    id: 1,
    name: "Steven Spielberg",
    age: 74,
  },
  {
    id: 2,
    name: "Christopher Nolan",
    age: 51,
  },
  {
    id: 3,
    name: "Quentin Tarantino",
    age: 58,
  },
  {
    id: 70,
    name: "Alex Tarantino",
    age: 70,
  },
];

const MoviesType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find((director) => director.id == parent.id);
      },
    },
  }),
});
const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
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
    directors: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find((director) => director.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
