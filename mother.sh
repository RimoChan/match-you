#!/usr/bin/bash
for pkg in $(pip3 list | awk '{print $1}' | tail -n +3)
do
pip3 uninstall "$pkg" -y
done
# reference
# https://bytefreaks.net/gnulinux/bash/get-the-first-column-of-a-file-in-bash
# https://stackoverflow.com/questions/339483/how-can-i-remove-the-first-line-of-a-text-file-using-bash-sed-script
