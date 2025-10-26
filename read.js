import fs from "fs";
import { resolve } from "path";

const filePath = resolve("data", "service_index.json");

// Проверяем наличие файла
if (!fs.existsSync(filePath)) {
  console.error("❌ File service_index.json not found.");
  process.exit(1);
}

// Создаем поток для чтения
const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

console.log("📖 Reading service_index.json in chunks...\n");

readStream.on("data", (chunk) => {
  console.log("📦 Received chunk:");
  console.log(chunk);
});

readStream.on("end", () => {
  console.log("\n✅ File reading completed.");
});

readStream.on("error", (err) => {
  console.error("❌ Reading file ERROR:", err.message);
});

