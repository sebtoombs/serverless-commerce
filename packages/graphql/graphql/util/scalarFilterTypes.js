/*
Basic scalar filter types.
All other filters are built out of these
*/

module.exports.String__Filter = {
  name: "String__Filter",
  fields: {
    eq: {
      type: "String",
    },
    regex: {
      type: "String",
    },
  },
  type: "Input",
};

module.exports.Boolean__Filter = {
  name: "Boolean__Filter",
  fields: {
    eq: {
      type: "Boolean",
    },
    ne: {
      type: "Boolean",
    },
  },
  type: "Input",
};

module.exports.Float__Filter = {
  name: "Float__Filter",
  fields: {
    eq: {
      type: "Float",
    },
    lt: {
      type: "Float",
    },
    gt: {
      type: "Float",
    },
    lte: {
      type: "Float",
    },
    gte: {
      type: "Float",
    },
  },
  type: "Input",
};

module.exports.Int__Filter = {
  name: "Int__Filter",
  fields: {
    eq: {
      type: "Int",
    },
    lt: {
      type: "Int",
    },
    gt: {
      type: "Int",
    },
    lte: {
      type: "Int",
    },
    gte: {
      type: "Int",
    },
  },
  type: "Input",
};
