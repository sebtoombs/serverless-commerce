var Generator = require("yeoman-generator");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("projectname", { type: String, required: true });
  }

  paths() {
    this.sourceRoot(path.join(__dirname, "templates"));
    this.destinationRoot(path.join(process.cwd(), this.options.projectname));
  }

  end() {
    this.log(`\nProject created!`);
    this.log(`Next steps;\n`);
    this.log(`\tcd ${this.options.projectname} && yarn dev`);
    this.log(`\n`);
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.options.projectname,
      },
      {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?",
      },
    ]);

    //this.log("app name", this.answers.name);
    //this.log("cool feature", this.answers.cool);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      this.answers
    );
  }

  install() {
    this.npmInstall();
  }
};
