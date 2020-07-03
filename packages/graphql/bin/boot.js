const config = require("./serverless-config");

module.exports = async () => {
  return await config();
};
