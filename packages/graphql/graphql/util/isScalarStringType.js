/**
 * for a given type string e.g. "String", "Float", "ObjectType" return true/false if is scalar or not
 * @param {String} typeString
 */
const isScalarStringType = (typeString) => {
  return ["String", "Float", "Int", "Boolean"].indexOf(typeString) > -1;
};

module.exports = isScalarStringType;
