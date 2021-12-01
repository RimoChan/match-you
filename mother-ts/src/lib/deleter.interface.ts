/**
 * The basic structure of a deleter.
 */
export interface DeleterInterface {
  /**
   * Describe what this deleter is for.
   */
  name: string;

  /**
   * Delete the file or directory in the given path.
   *
   * @param baseDir The base directory.
   */
  delete(baseDir: string): Promise<void>;
}
