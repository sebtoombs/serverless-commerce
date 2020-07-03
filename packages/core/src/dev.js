//import app from "@serverless-commerce/app";
import graphql from "@serverless-commerce/graphql";

export default function () {
  process.env.DEBUG = "*";

  graphql();
}
