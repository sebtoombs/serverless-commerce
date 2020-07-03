/**
 * Take a type defined using new graphql.GraphQLObjectType and parse out a string typeDef & maybe resolver function
 * @param {GraphQLObjectType} objectType
 * @return {Object} {typeDef:String,resolve:function}
 */

const graphql = require("graphql");

const buildObjectType = (objectType) => {
  const fieldsArray = [];
  const typeResolveObject = {};

  //console.log(Object.keys(objectType));
  const type =
    objectType instanceof graphql.GraphQLInputObjectType ? "input" : "type";

  const fields = objectType.getFields();

  Object.keys(fields).map((fieldName) => {
    const field = fields[fieldName];
    const fieldTypeName = field.type.name
      ? field.type.name
      : `[${field.type.ofType.name}]`;

    let fieldString = `\t${fieldName}`;
    //Maybe add list filters
    if (type === "type" && field.type.ofType) {
      fieldString += `(elemMatch: ${field.type.ofType.name}FilterType)`;
    }

    fieldString += `: ${fieldTypeName}`;

    fieldsArray.push(fieldString);

    if (typeof field.resolve === `function`) {
      typeResolveObject[fieldName] = field.resolve;
    }
  });

  const typeString = `${type} ${objectType.name} {
    ${fieldsArray.join("\n")}
}`;

  return {
    typeDef: typeString,
    resolve: Object.keys(typeResolveObject).length ? typeResolveObject : null,
  };
};

module.exports = buildObjectType;
