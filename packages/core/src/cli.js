import arg from "arg";
import inquirer from "inquirer";
import dev from "./dev";
import graphql from "./graphql";

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
  console.log(options);

  if (options.command === `dev`) {
    dev();
    graphql();
  }
}
