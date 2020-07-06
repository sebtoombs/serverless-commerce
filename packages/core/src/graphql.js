import graphql from "@serverless-commerce/graphql";

export default function () {
  process.env.DEBUG = "*";
  //Start the graphql server
  return graphql();
}
