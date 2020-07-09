const yeoman = require("yeoman-environment");
const env = yeoman.createEnv();

//env.register(require.resolve('generators/project'), 'npm:app');
//console.log(process.cwd());
//console.log(__dirname);
//module.exports = () => {
env.registerStub(
  require("../generators/project"),
  "@serverless-commerce:project"
);

try {
  env.run(`@serverless-commerce:project ${process.argv.slice(2).join(" ")}`);
} catch (e) {
  console.log(e.toString());
}
//};
