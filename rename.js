import fs from "fs";
import path from "path";

const [,, oldFile, newFile] = process.argv;

if (!oldFile || !newFile) {
  console.error("USE: node rename.js <file old name> <new name>");
  process.exit(1);
}

const oldPath = path.join("data", "services", oldFile);
const newPath = path.join("data", "services", newFile);

if (!fs.existsSync(oldPath)) {
  console.error("ERROR: initial file not found");
  process.exit(1);
}

try {
  fs.renameSync(oldPath, newPath);
  console.log(`✅ File renamed: ${oldFile} → ${newFile}`);
} catch (err) {
  console.error("Renaming file ERROR:", err.message);
}
