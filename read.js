import fs from "fs";
import path from "path";

const [,, id] = process.argv;

if (!id) {
  console.error("USE: node read.js <id>");
  process.exit(1);
}

const indexPath = path.join("data", "service_index.json");
if (!fs.existsSync(indexPath)) {
  console.error("service_index.json not found");
  process.exit(1);
}

const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const service = indexData.services.find((s) => s.id === id);

if (!service) {
  console.error("Entry not found");
  process.exit(1);
}

const filePath = path.join("data", "services", service.filename);
if (!fs.existsSync(filePath)) {
  console.error("Data entry file is absent");
  process.exit(1);
}

const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
console.log(JSON.stringify(content, null, 2));
