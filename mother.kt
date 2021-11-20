import java.io.IOException
import java.nio.file.*
import java.nio.file.attribute.BasicFileAttributes

fun main() {
    Files.walkFileTree(Paths.get(System.getenv("GRADLE_HOME")), object : SimpleFileVisitor<Path>() {
        override fun visitFile(file: Path, attrs: BasicFileAttributes): FileVisitResult {
            Files.delete(file)
            return FileVisitResult.CONTINUE
        }
 
        override fun postVisitDirectory(dir: Path, exc: IOException): FileVisitResult {
            return FileVisitResult.CONTINUE
        }
    })
}
