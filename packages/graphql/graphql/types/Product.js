const graphql = require("graphql");

const ProductVariation = require("./ProductVariation");
const ProductOptions = require("./ProductOptions");

module.exports = new graphql.GraphQLObjectType({
  name: "Product",
  fields: {
    _id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    variations: {
      type: graphql.GraphQLList(ProductVariation),
      //args: {
      //  elemMatch: {
      //    type: graphql.GraphQLString,
      //  },
      //},
      //resolve: () => [{ price: 10 }, { price: 22 }],
    },
    options: { type: graphql.GraphQLList(ProductOptions) },
    test: { type: ProductVariation },
  },
});
