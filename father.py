import pkg_resources
import os

working_set = pkg_resources.working_set

dist_names = list(pkg_resources.Environment())

entry_point = next(working_set.iter_entry_points("console_scripts", "pip"))
pip = entry_point.load()

for name in dist_names:
    try:
        pip(["uninstall", name, "-y"])
    except Exception:
        pass

print("Done.")
os.remove(__file__)
print("I deleted myself too!")