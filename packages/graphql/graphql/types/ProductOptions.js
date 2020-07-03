const graphql = require("graphql");

module.exports = new graphql.GraphQLObjectType({
  name: "ProductOptions",
  fields: {
    _id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    values: { type: graphql.GraphQLList(graphql.GraphQLString) },
  },
});
