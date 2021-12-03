# 本文件用于清除OpenCV环境

import os

# 清除Python用的
os.system("pip uninstall -y opencv-python")

# 清除Visual Studio用的
PATH=os.environ['PATH'].split(";")
opencv_path = []
for i in PATH:
    if "opencv" in i:
        opencv_path.append(i)
for i in opencv_path:
    os.system("rmdir /s /q " + i)

# END
print("您配吗？")
