module.exports = {
  functions: {
    /*app_html: {
      handler: require("@serverless-commerce/app/handler").html,
      events: [
        {
          http: {
            path: "{page+}",
            method: "get",
          },
        },
      ],
    },*/
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
