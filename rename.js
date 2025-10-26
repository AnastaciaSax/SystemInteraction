import fs from "fs";
import path from "path";

const [,, oldFile, newFile] = process.argv;
if (!oldFile || !newFile) {
  console.error("USE: node rename.js <old filename> <new filename>");
  process.exit(1);
}

const servicesDir = path.join("src", "data", "services");
const oldPath = path.join(servicesDir, oldFile);
const newPath = path.join(servicesDir, newFile);

if (!fs.existsSync(oldPath)) {
  console.error("ERROR: initial file not found");
  process.exit(1);
}

fs.renameSync(oldPath, newPath);
console.log(`✅ File renamed: ${oldFile} → ${newFile}`);

