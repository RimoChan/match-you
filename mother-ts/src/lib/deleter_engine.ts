/**
 * The backend engine for a deleter.
 */
import { DeleterInterface } from "./deleter.interface";
import * as fs from "fs";

export abstract class DeleterEngine implements DeleterInterface {
  abstract name: string;

  protected banner() {
    console.log(`Deleting: ${this.name}`);
  }

  protected async deleteFile(dir: string): Promise<void> {
    try {
      await fs.promises.rm(dir, {
        recursive: true,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Failed to delete: (${e.name}) ${e.message}`);
      } else {
        console.error(`Failed to delete: ${e}`);
      }
    }
  }

  abstract delete(baseDir: string): Promise<void>;
}
