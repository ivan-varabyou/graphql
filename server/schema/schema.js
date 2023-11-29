const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const movies = [
  {
    id: 2,
    name: "The Godfather",
    genre: "Crime",
    directorId: 1,
  },
  {
    id: 3,
    name: "The Dark Knight",
    genre: "Action",
    directorId: 2,
  },
  {
    id: 7,
    name: "The Matrix",
    genre: "Action",
    directorId: 2,
  },
  {
    id: 13,
    name: "The Dark Knight Rises",
    genre: "Action",
    directorId: 2,
  },
  {
    id: 17,
    name: "Inception",
    genre: "Sci-Fi",
    directorId: 2,
  },
  {
    id: 5,
    name: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Fantasy",
    directorId: 4,
  },
  {
    id: 8,
    name: "Star Wars: Episode IV - A New Hope",
    genre: "Sci-Fi",
    directorId: 4,
  },
  {
    id: 12,
    name: "The Lord of the Rings: The Two Towers",
    genre: "Fantasy",
    directorId: 4,
  },
  {
    id: 15,
    name: "The Lord of the Rings: The Return of the King",
    genre: "Fantasy",
    directorId: 4,
  },
  {
    id: 4,
    name: "Pulp Fiction",
    genre: "Crime",
    directorId: 3,
  },
  {
    id: 9,
    name: "The Silence of the Lambs",
    genre: "Thriller",
    directorId: 3,
  },
  {
    id: 14,
    name: "Goodfellas",
    genre: "Crime",
    directorId: 3,
  },
  {
    id: 19,
    name: "Fight Club",
    genre: "Drama",
    directorId: 3,
  },
  {
    id: 20,
    name: "Interstellar",
    genre: "Sci-Fi",
    directorId: 2,
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
    movies: {
      type: new GraphQLList(MoviesType),
      resolve(parent, args) {
        return movies.filter((movie) => movie.directorId == parent.id);
      },
    },
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
