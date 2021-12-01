import {availableDeleters} from "./src";

async function main() {
  console.log("Start running deleters :)");
  await Promise.all(availableDeleters.map((Deleter) => new Deleter()).map((deleter) => {
    return deleter.delete(process.cwd());
  }));
}

main();
