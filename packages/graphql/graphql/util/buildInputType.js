const isScalarStringType = require("./isScalarStringType");
const getStringTypeListType = require("./getStringTypeListType");

/**
 * Build filter args for a queried object type
 * This means we can filter a list
 * @param {GraphQLObjectType} queriedType
 */
const buildInputType = (
  queriedTypeName,
  queriedType,
  { isFilterType = false } = {}
) => {
  const fields = {};
  const queriedTypeFields = queriedType.fields;

  for (const fieldName in queriedTypeFields) {
    const queriedTypeField = queriedTypeFields[fieldName];

    if (!queriedTypeField.type) {
      throw new Error(
        `buildFilterType : Field type missing - ${queriedTypeName}.${fieldName}`
      );
    }

    const isScalar = isScalarStringType(queriedTypeField.type);
    const typeFieldName = isFilterType
      ? `${queriedTypeField.type}__Filter`
      : !isScalar
      ? `${queriedTypeField.type}__Input`
      : queriedTypeField.type;

    //Scalars
    if (isScalarStringType(queriedTypeField.type)) {
      fields[fieldName] = { type: typeFieldName };
    }
    // Lists
    else if (getStringTypeListType(queriedTypeField.type)) {
      //Lists dont work for now
    }
    // Other types
    else {
      //fields[fieldName] = { type: buildFilters(queriedTypeField.type) };
      fields[fieldName] = { type: typeFieldName };
    }
  }

  //return new graphql.GraphQLInputObjectType({
  return {
    name: `${queriedTypeName}__${isFilterType ? `Filter` : `Input`}`,
    fields,
    type: `Input`,
  };
  //});
};

module.exports = buildInputType;
