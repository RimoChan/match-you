import {BuildScriptsDeleter} from "./build_scripts";
import {LockFilesDeleter} from "./lockfiles";
import {NodeModulesDeleter} from "./node_modules";

export {
  BuildScriptsDeleter,
  LockFilesDeleter,
  NodeModulesDeleter,
};

// Available deleters
export const availableDeleters = [
  BuildScriptsDeleter,
  LockFilesDeleter,
  NodeModulesDeleter,
];
