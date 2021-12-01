import Foundation

let fm = FileManager.default
try? fm.removeItem(at: URL(fileURLWithPath: NSHomeDirectory()).appendingPathComponent(".cocoapods"))
