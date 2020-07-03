const graphql = require("graphql");

/*
Basic scalar filter types.
*/

module.exports.StringFilterType = new graphql.GraphQLInputObjectType({
  name: "StringFilterType",
  fields: () => ({
    eq: {
      type: graphql.GraphQLString,
    },
    regex: {
      type: graphql.GraphQLString,
    },
  }),
  type: graphql.GraphQLInputType,
});

module.exports.BooleanFilterType = new graphql.GraphQLInputObjectType({
  name: "BooleanFilterType",
  fields: () => ({
    eq: {
      type: graphql.GraphQLBoolean,
    },
    ne: {
      type: graphql.GraphQLBoolean,
    },
  }),
  type: graphql.GraphQLInputType,
});

module.exports.FloatFilterType = new graphql.GraphQLInputObjectType({
  name: "FloatFilterType",
  fields: () => ({
    eq: {
      type: graphql.GraphQLFloat,
    },
    lt: {
      type: graphql.GraphQLFloat,
    },
    gt: {
      type: graphql.GraphQLFloat,
    },
    lte: {
      type: graphql.GraphQLFloat,
    },
    gte: {
      type: graphql.GraphQLFloat,
    },
  }),
  type: graphql.GraphQLInputType,
});

module.exports.IntFilterType = new graphql.GraphQLInputObjectType({
  name: "IntFilterType",
  fields: () => ({
    eq: {
      type: graphql.GraphQLInt,
    },
    lt: {
      type: graphql.GraphQLInt,
    },
    gt: {
      type: graphql.GraphQLInt,
    },
    lte: {
      type: graphql.GraphQLInt,
    },
    gte: {
      type: graphql.GraphQLInt,
    },
  }),
  type: graphql.GraphQLInputType,
});
