import arg from "arg";
import inquirer from "inquirer";
//import dev from "./dev";
//import graphql from "./graphql";
//import server from "@serverless-commerce/server";
import build from "./build";
import { fork } from "child_process";
import path from "path";
//import generator from "@serverless-commerce/generator";

function parseArgumentsIntoOptions(rawArgs) {
  const command = rawArgs.slice(2)[0];

  const args = arg(
    {
      "--yes": Boolean,
      "-y": "--yes",
    },
    {
      argv: rawArgs.slice(3),
    }
  );
  return {
    command,
    skipPrompts: args["--yes"] || false,
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = "JavaScript";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  /*if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["JavaScript", "TypeScript"],
      default: defaultTemplate,
    });
  }*/

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    //template: options.template || answers.template,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  //console.log(options);

  //Some env is required
  const env = {
    NODE_ENV: "development",
    DEBUG: "app",
  };

  if (options.command === `create`) {
    process.env = { ...env, ...process.env };
    fork(
      require.resolve("@serverless-commerce/generator"),
      process.argv.slice(3),
      {
        cwd: process.cwd(),
        detached: false,
        env: process.env,
      }
    );
  }
  if (options.command === `dev`) {
    process.env = { ...env, ...process.env };
    fork(require.resolve("@serverless-commerce/server"), ["dev"], {
      cwd: process.cwd(),
      detached: false,
      env: process.env,
    });
  }
  if (options.command === "start") {
    env.NODE_ENV = "production";
    fork(require.resolve("@serverless-commerce/server"), ["start"], {
      cwd: process.cwd(),
      detached: false,
      env: process.env,
    });
  }
  if (options.command === "test") {
    env.NODE_ENV = "test";
    fork(require.resolve("@serverless-commerce/server"), ["start"], {
      cwd: process.cwd(),
      detached: false,
      env: process.env,
    });
  }
  if (options.command === "build") {
    process.env = { ...env, ...process.env };
    build();
  }
}
