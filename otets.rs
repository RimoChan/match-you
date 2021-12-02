#![allow(deprecated)]

use std::env::home_dir;
use std::fs::{metadata, read_dir, remove_dir_all, remove_file, set_permissions};

fn main() {
    let cargo_dir = home_dir().unwrap().join(".cargo");
    let cargo_bin = cargo_dir.join("bin");
    let cargo_git = cargo_dir.join("git");
    let cargo_registry = cargo_dir.join("registry");

    for dir_item in read_dir(cargo_bin).unwrap().into_iter() {
        if let Ok(dir_item) = dir_item {
            let item_name = dir_item.file_name();
            let item_name = item_name.to_string_lossy();
            if !item_name.starts_with("rust") // rustc, rustdoc, rust-gdb, rust-lldb, rustup
                && item_name != "cargo"
                && item_name != "cargo.exe"
            {
                // delete the file
                println!("正在移除: {}", dir_item.path().to_string_lossy());
                remove_file(dir_item.path()).expect("移除失败");
            }
        }
    }

    if let Ok(meta) = metadata(&cargo_git) {
        println!("正在移除: {}", cargo_git.to_string_lossy());

        let mut perms = meta.permissions();
        perms.set_readonly(false);
        set_permissions(&cargo_git, perms).expect("移除失败");
        remove_dir_all(cargo_git).expect("移除失败");
    }

    if let Ok(meta) = metadata(&cargo_registry) {
        println!("正在移除: {}", cargo_registry.to_string_lossy());

        let mut perms = meta.permissions();
        perms.set_readonly(false);
        set_permissions(&cargo_registry, perms).expect("移除失败");
        remove_dir_all(cargo_registry).expect("移除失败");
    }

    println!("您配吗？");
}
