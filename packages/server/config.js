module.exports = {
  functions: {
    graphql: {
      handler: require("@serverless-commerce/graphql/graphql").handler,
      events: [
        {
          http: {
            path: "graphql",
            method: "GET",
            cors: true,
          },
        },
        {
          http: {
            path: "graphql",
            method: "POST",
            cors: true,
          },
        },
      ],
    },
  },
};
