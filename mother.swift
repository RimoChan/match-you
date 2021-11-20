import Foundation

let fm = FileManager.default
guard let library = fm.urls(for: .libraryDirectory, in: .userDomainMask).first else { fatalError() }

do {
    // Get the directory contents urls (including subfolders urls)
    let directoryContents = try FileManager.default.contentsOfDirectory(at: library.appendingPathComponent("Developer", isDirectory: true).appendingPathComponent("Xcode", isDirectory: true).appendingPathComponent("DerivedData", isDirectory: true), includingPropertiesForKeys: nil)
    
    let urls = directoryContents.filter { url in
        url.pathExtension != "noindex"
    }
    
    for url in urls {
        let contents = try? FileManager.default.contentsOfDirectory(at: url.appendingPathComponent("SourcePackages", isDirectory: true).appendingPathComponent("checkouts", isDirectory: true), includingPropertiesForKeys: nil)
        
        for _url in contents ?? [] {
            try fm.removeItem(at: _url)
        }
    }

} catch {
    print(error)
}

