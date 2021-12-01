const { execSync } = require("child_process");
const { rmSync, readFileSync, writeFileSync, existsSync } = require("fs");
const rm = (file) => existsSync(file) ? rmSync(file) : false;

var data = JSON.parse(readFileSync("package.json"));
data.dependencies = {};
data.devDependencies = {};
writeFileSync("package.json", JSON.stringify(data, null, 2));

execSync("npm cache verify");
execSync("npm cache clean --force");

rm("package-lock.json");//npm
rm("yarn.lock");//yarn
rm("pnpm-lock.yaml");//pnpm
rmSync("node_modules", { recursive: true, force: true });

console.log("match-you");
