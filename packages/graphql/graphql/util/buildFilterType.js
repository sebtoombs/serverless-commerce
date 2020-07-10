const isScalarStringType = require("./isScalarStringType");
const getStringTypeListType = require("./getStringTypeListType");

/**
 * Build filter args for a queried object type
 * This means we can filter a list
 * @param {GraphQLObjectType} queriedType
 */
const buildFilterType = (queriedTypeName, queriedType) => {
  const fields = {};
  const queriedTypeFields = queriedType.fields;
  for (const fieldName in queriedTypeFields) {
    const queriedTypeField = queriedTypeFields[fieldName];

    if (!queriedTypeField.type) {
      throw new Error(
        `buildFilterType : Field type missing - ${queriedTypeName}.${fieldName}`
      );
    }

    //Scalars
    if (isScalarStringType(queriedTypeField.type)) {
      fields[fieldName] = { type: `${queriedTypeField.type}__Filter` };
    }
    // Lists
    else if (getStringTypeListType(queriedTypeField.type)) {
      //Lists dont work for now
    }
    // Other types
    else {
      //fields[fieldName] = { type: buildFilters(queriedTypeField.type) };
      fields[fieldName] = { type: `${queriedTypeField.type}__Filter` };
    }
  }

  //return new graphql.GraphQLInputObjectType({
  return {
    name: `${queriedTypeName}__Filter`,
    fields,
    type: `Input`,
  };
  //});
};

module.exports = buildFilterType;
