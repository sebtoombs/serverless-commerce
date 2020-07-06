//import app from "@serverless-commerce/app";
//import graphql from "@serverless-commerce/graphql";

import server from "@serverless-commerce/server";

export default function () {
  //process.env.DEBUG = "*";
  //Start the graphql server
  //graphql();
  //app();
  return server();
}
