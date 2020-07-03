const {
  StringFilterType,
  BooleanFilterType,
  FloatFilterType,
  IntFilterType,
} = require("./scalarFilterTypes");

/**
 * Given a GraphQlObjectType, rturn the appropriate basic scalar filter type
 * @param {*} queriedType
 */
const queriedTypeToFilterType = (queriedType) => {
  let filterType = null;
  const typeName = queriedType.name;
  if (typeName === `String`) {
    filterType = StringFilterType;
  } else if (typeName === `Boolean`) {
    filterType = BooleanFilterType;
  } else if (typeName === `Float`) {
    filterType = FloatFilterType;
  } else if (typeName === `Int`) {
    filterType = IntFilterType;
  }
  return filterType;
};

module.exports = queriedTypeToFilterType;
