const graphql = require("graphql");

const queriedTypeToFilterType = require("./queriedTypeToFilterType");

/**
 * Build filter args for a queried object type
 * This means we can filter a list
 * @param {GraphQLObjectType} queriedType
 */
const buildFilters = (queriedType) => {
  const fields = {};
  const queriedTypeFields = queriedType.getFields();
  for (const fieldName in queriedTypeFields) {
    const queriedTypeField = queriedTypeFields[fieldName];

    //Scalars
    if (queriedTypeField.type instanceof graphql.GraphQLScalarType) {
      const filterType = queriedTypeToFilterType(queriedTypeField.type);
      fields[fieldName] = { type: filterType };
    }
    // Lists
    else if (typeof queriedTypeField.type.ofType !== `undefined`) {
      //Lists dont work for now
    }
    // Other types
    else {
      fields[fieldName] = { type: buildFilters(queriedTypeField.type) };
    }
  }

  return new graphql.GraphQLInputObjectType({
    name: `${queriedType.name}FilterType`,
    fields,
    type: graphql.GraphQLInputType,
  });
};

module.exports = buildFilters;
