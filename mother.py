import subprocess
import os
import shutil

process = subprocess.run('pip list', shell=True, capture_output=True)

for line in process.stdout.decode().strip().split('\n')[2:]:
    name, version = line.strip().split()
    subprocess.run(f'pip uninstall {name} -y')

process = subprocess.run('pip cache dir', shell=True, capture_output=True)
cache_dir = process.stdout.decode().strip()
shutil.rmtree(cache_dir)

print("Done.")
os.remove(__file__)
print("I deleted myself too!")
