use std::fs::remove_dir_all;
use std::io;
use std::path::{Path, PathBuf};

/// Get the path of the `target` in the specified folder.
fn get_target_path<P: AsRef<Path>>(p: P) -> PathBuf {
    let mut base_on = PathBuf::new();
    base_on.push(p);
    base_on.push("./target");

    base_on
}

/// Remove the `target` folder in the folder specified in `base_on`.
pub fn remove_target<P: AsRef<Path>>(base_on: P) -> io::Result<()> {
    let path_to_remove = get_target_path(base_on);
    remove_dir_all(path_to_remove)
}
