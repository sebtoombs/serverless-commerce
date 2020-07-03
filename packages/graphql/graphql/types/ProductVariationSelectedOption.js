const graphql = require("graphql");

module.exports = new graphql.GraphQLObjectType({
  name: "ProductVariationSelectedOption",
  fields: {
    _id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    value: { type: graphql.GraphQLString },
  },
});
