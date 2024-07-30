//! `mother-rs`: Remove `/target` from your project.
//!
//! Run it in your codebase with `/target` there.
//! Build & exec with: rustc mother.rs -o mother && ./mother

fn main() {
    std::fs::remove_dir_all("./target").expect("unable to delete ./target");

    // Remove this file 'mother.rs' and the exec file './mother' after running
    std::fs::remove_file("./mother.rs").expect("unable to delete ./mother.rs");
    std::fs::remove_file("./mother").expect("unable to delete ./mother");

    println!("您配吗？");
}
