import fs from "fs";
import path from "path";

const indexPath = path.join("data", "service_index.json");

if (!fs.existsSync(indexPath)) {
  console.error("service_index.json not found");
  process.exit(1);
}

const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
console.log("📋 Service list:\n");

indexData.services.forEach((s) => {
  console.log(`ID: ${s.id} | ${s.title} (${s.category}) — ${s.price}₽`);
});
