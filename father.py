import pkg_resources

working_set = pkg_resources.working_set

dist_names = list(pkg_resources.Environment())

pip_entry_point = next(working_set.iter_entry_points("console_scripts",
                                                     "pip")).load()
conda_entry_point = next(
    working_set.iter_entry_points("console_scripts", "conda")).load()

pip_entry_point(["cache", "remove", "*"])
conda_entry_point(["clean", "-a", "-y"])

for name in dist_names:
    try:
        pip_entry_point(["uninstall", name, "-y"])
        conda_entry_point(["uninstall", name, "-y"])
    except Exception:
        pass
