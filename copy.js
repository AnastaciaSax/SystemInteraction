import fs from "fs";
import path from "path";

const [,, sourceDir, destDir] = process.argv;

if (!sourceDir || !destDir) {
  console.error("USE: node copy.js <source_folder> <destination_folder>");
  process.exit(1);
}

if (!fs.existsSync(sourceDir)) {
  console.error("ERROR: initial folder not found");
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error("Reading folder ERROR", err.message);
    process.exit(1);
  }

  files.forEach((file) => {
    const src = path.join(sourceDir, file);
    const dest = path.join(destDir, file);
    fs.copyFile(src, dest, (err) => {
      if (err) console.error(`Copying ${file} ERROR:`, err.message);
    });
  });

  console.log(`📂 Backup created in: ${destDir}`);
});
