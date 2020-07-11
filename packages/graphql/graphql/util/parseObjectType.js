const getStringTypeListType = require("./getStringTypeListType");
const isScalarStringType = require("./isScalarStringType");

/**
 * Convert an object representation of a type into its string typedef + resolvers object
 * @param {GraphQLObjectType} objectType
 * @return {Object} {typeDef:String,resolve:{fieldKey: resolve function}}
 */

const parseObjectType = (name, objectType) => {
  if (typeof name === `undefined`) {
    throw new Error(
      `parseObjectType (name, objectType) : name must be specified`
    );
  }
  if (typeof objectType !== `object`) {
    throw new Error(
      `parseObjectType (name, objectType) : objectType must be specified`
    );
  }

  //Is this a type, or an input?
  const type =
    typeof objectType.type !== `undefined`
      ? objectType.type.toLowerCase()
      : "type";

  //Collect field resolvers if specified
  const resolvers = {};

  //Make an array of field defs to join in a moment
  const fieldsArray = [];

  //a list of fields this type can be queried by
  const queryFields = [];

  Object.keys(objectType.fields).map((fieldKey) => {
    const field = objectType.fields[fieldKey];

    let fieldString = `\t${fieldKey}`;

    if (!field.type) {
      throw new Error(
        `parseObjectType : Field type missing - ${name}.${fieldKey}`
      );
    }

    let listType = getStringTypeListType(field.type);
    //Maybe add list filters
    if (listType && type === `type`) {
      fieldString += `(elemMatch: ${listType}__Filter)`;
    }

    fieldString += `: ${field.type}`;

    //Add field string def to array
    fieldsArray.push(fieldString);

    //If field has a resolver, lets collect it
    if (typeof field.resolve === `function`) {
      resolvers[fieldKey] = field.resolve;
    }

    //is this field queriable?

    if (
      type === `type` &&
      typeof objectType.query !== `undefined` &&
      objectType.query.by.indexOf(fieldKey) !== -1 &&
      !listType
    ) {
      const inputType = isScalarStringType(field.type)
        ? field.type
        : `${field.type}__Input`;
      queryFields.push(`${fieldKey}: ${inputType}`);
    }
  });

  const typeString = `${type} ${name} {
    ${fieldsArray.join("\n")}
  }`;

  const queryString = `${name.toLowerCase()}(${queryFields.join(
    ", "
  )}) : ${name}`;

  return {
    typeDef: typeString,
    resolve: Object.keys(resolvers).length ? resolvers : null,
    query:
      typeof objectType.query !== `undefined` && queryFields.length
        ? queryString
        : null,
  };
};

module.exports = parseObjectType;
