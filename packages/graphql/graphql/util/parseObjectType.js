const getStringTypeListType = require("./getStringTypeListType");

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

  //  console.log(objectType);

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
  });

  const typeString = `${type} ${name} {
    ${fieldsArray.join("\n")}
  }`;

  return {
    typeDef: typeString,
    resolve: Object.keys(resolvers).length ? resolvers : null,
  };
};

module.exports = parseObjectType;
