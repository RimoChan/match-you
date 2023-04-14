import os
import platform
import shutil
import subprocess


def find_conda_path():
    try:
        result = subprocess.run(["conda", "info"], capture_output=True, text=True, check=True)
        lines = result.stdout.split('\n')

        for line in lines:
            if 'base environment' in line:
                return line.split(':')[1].strip()
    except subprocess.CalledProcessError:
        pass
    return None


def remove_conda_directory(conda_path):
    try:
        if platform.system() == 'Windows':
            os.system(f'rmdir /S /Q "{conda_path}"')
        else:
            shutil.rmtree(conda_path)
    except Exception as e:
        print(f"Error removing Anaconda directory: {e}")


def remove_conda_path_from_env(conda_path):
    system = platform.system()

    if system == 'Windows':
        import winreg

        def remove_path_from_registry(root, path):
            try:
                key = winreg.OpenKey(root, r"Environment", 0, winreg.KEY_ALL_ACCESS)
                try:
                    env_path = winreg.QueryValueEx(key, "Path")[0]
                    env_path_list = env_path.split(';')
                    if path in env_path_list:
                        env_path_list.remove(path)
                        new_env_path = ';'.join(env_path_list)
                        winreg.SetValueEx(key, "Path", 0, winreg.REG_EXPAND_SZ, new_env_path)
                        return True
                finally:
                    winreg.CloseKey(key)
            except FileNotFoundError:
                pass
            return False

        user_env_changed = remove_path_from_registry(winreg.HKEY_CURRENT_USER, conda_path)
        system_env_changed = remove_path_from_registry(winreg.HKEY_LOCAL_MACHINE, conda_path)

        if user_env_changed or system_env_changed:
            print("Anaconda path removed from environment variables.")
        else:
            print("Anaconda path not found in environment variables.")
    else:
        shell = os.environ.get('SHELL')
        if not shell:
            print("Unable to determine the shell.")
            return
        config_file = os.path.expanduser('~/.bashrc') if 'bash' in shell else os.path.expanduser('~/.zshrc')

        try:
            with open(config_file, 'r') as file:
                content = file.read()
        except FileNotFoundError:
            print(f"Configuration file {config_file} not found.")
            return

        lines = content.split('\n')
        updated_lines = [line for line in lines if conda_path not in line]

        if len(lines) != len(updated_lines):
            try:
                with open(config_file, 'w') as file:
                    file.write('\n'.join(updated_lines))
                print(f"Anaconda path removed from {config_file}.")
            except Exception as e:
                print(f"Error updating {config_file}: {e}")
        else:
            print("Anaconda path not found in the configuration file.")


def main():
    conda_path = find_conda_path()

    if not conda_path:
        print("Anaconda (conda) not found.")
        return

    print(f"Found Anaconda at {conda_path}. Removing...")
    remove_conda_directory(conda_path)
    remove_conda_path_from_env(conda_path)
    print("Anaconda has been removed.")


if __name__ == "__main__":
    main()
