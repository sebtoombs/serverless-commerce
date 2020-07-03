const graphql = require("graphql");

const ProductVariationSelectedOption = require("./ProductVariationSelectedOption");

module.exports = new graphql.GraphQLObjectType({
  name: "ProductVariation",
  fields: {
    _id: { type: graphql.GraphQLString },
    selectedOptions: {
      type: graphql.GraphQLList(ProductVariationSelectedOption),
    },
    sku: { type: graphql.GraphQLString },
    price: { type: graphql.GraphQLFloat },
    weight: { type: graphql.GraphQLFloat },
    weightUnit: { type: graphql.GraphQLString },
  },
});
