import {DeleterInterface} from "../deleter.interface";
import {DeleterEngine} from "../deleter_engine";
import path from "path";

export class BuildScriptsDeleter extends DeleterEngine implements DeleterInterface {
  public name = "build scripts";

  public async delete(baseDir: string): Promise<void> {
    const deleteFile = (fn: string) => this.deleteFile(path.join(baseDir, fn));
      this.banner();
      await Promise.all([
        deleteFile("Dockerfile"),
        deleteFile("docker-compose.yml"),
        deleteFile("package.json"),
        deleteFile("README.md"),
      ]);
  }
}
