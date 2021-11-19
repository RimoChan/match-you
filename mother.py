import subprocess


process = subprocess.run('pip list', shell=True, capture_output=True)

for line in process.stdout.decode().strip().split('\n')[2:]:
    name, version = line.strip().split()
    subprocess.run(f'pip uninstall {name} -y')
