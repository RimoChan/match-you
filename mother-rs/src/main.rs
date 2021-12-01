//! `mother-rs`: Remove `/target` from your project.
//!
//! Run it in your codebase with `/target` there.

use mother_rs::remove_target;

fn main() {
    remove_target(".").expect("unable to delete ./target");
}
