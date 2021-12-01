import {DeleterInterface} from "../deleter.interface";
import {DeleterEngine} from "../deleter_engine";
import path from "path";

export class LockFilesDeleter extends DeleterEngine implements DeleterInterface {
  public name = "lockfiles";

  public async delete(baseDir: string): Promise<void> {
    const deleteFile = (fn: string) => this.deleteFile(path.join(baseDir, fn));
      this.banner();
      await Promise.all([
        deleteFile("yarn.lock"),
        deleteFile("package-lock.json"),
        deleteFile("pnpm-lock.yaml"),
      ]);
  }
}
