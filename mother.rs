//! `mother-rs`: Remove `/target` from your project.
//!
//! Run it in your codebase with `/target` there.

fn main() {
    std::fs::remove_dir_all("./target").expect("unable to delete ./target");
}
