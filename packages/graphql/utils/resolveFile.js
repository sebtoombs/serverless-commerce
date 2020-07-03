const to = require("./to");
const fs = require("fs").promises;
const path = require("path");
/**
 * Resolve a file either from the package or from the client project
 * allows "shadowing" or overriding of files
 * @param {*} filePath
 */
module.exports = async function resolveFile(filePath) {
  const projectFilePath = path.join(process.cwd(), filePath);
  const localFilePath = path.join(__dirname, "..", filePath);
  const [statErr, stat] = await to(fs.stat(projectFilePath));
  if (!statErr) return projectFilePath;
  return localFilePath;
};
