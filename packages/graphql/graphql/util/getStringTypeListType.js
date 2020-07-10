/**
 * Will accept a type string e.g. "String", "Int", "[Float]", "[ObjectType]" and
 * return the list type if its a list or false otherwise
 * @param {String} typeString A string representation of a type
 */
const getStringTypeListType = (typeString) => {
  const match = typeString.match(/^\[(.*?)\]$/);
  if (match && match.length > 1) return match[1];
  return false;
};

module.exports = getStringTypeListType;
