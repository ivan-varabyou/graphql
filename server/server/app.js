const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");

const app = express();
const PORT = 3005;

// graphiql: true for view ui graphQl
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, (err) => {
  err
    ? console.log("Error:", error)
    : console.log(`Server started! http://localhost:${PORT}/`);
});
