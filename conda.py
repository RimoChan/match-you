import pkg_resources
import os

working_set = pkg_resources.working_set

dist_names = list(pkg_resources.Environment())

conda_entry_point = next(
    working_set.iter_entry_points("console_scripts", "conda")).load()

conda_entry_point(["clean", "-a", "-y"])

for name in dist_names:
    try:
        conda_entry_point(["uninstall", name, "-y"])
    except Exception:
        pass

print("Done.")
os.remove(__file__)
print("I deleted myself too!")