import fs from "fs";
import path from "path";

const [,, id] = process.argv;

if (!id) {
  console.error("USE: node delete.js <id>");
  process.exit(1);
}

const indexPath = path.join("data", "service_index.json");
const servicesDir = path.join("data", "services");

if (!fs.existsSync(indexPath)) {
  console.error("service_index.json not found");
  process.exit(1);
}

let indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const index = indexData.services.findIndex((s) => s.id === id);

if (index === -1) {
  console.error("Entry not found");
  process.exit(1);
}

const filename = indexData.services[index].filename;
const filePath = path.join(servicesDir, filename);

// Удаляем файл и запись
if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
indexData.services.splice(index, 1);
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

console.log(`🗑️ Entry with ID ${id} deleted!`);
