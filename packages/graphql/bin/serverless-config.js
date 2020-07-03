const fs = require("fs").promises;
const YAML = require("yaml");
const path = require("path");
const resolveFile = require("../utils/resolveFile");

module.exports = async () => {
  const configFilePath = await resolveFile("serverless.yml");
  const file = await fs.readFile(configFilePath, "utf8");

  const config = YAML.parse(file);

  return {
    provider: config.provider.name,
    functions: config.functions,
  };
};
