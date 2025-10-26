import fs from "fs";
import path from "path";

// args: title category place price [photoURL]
const [,, title, category, place, priceArg, photoURL = "/Assets/Logo.png"] = process.argv;

if (!title || !category || !place || !priceArg) {
  console.error("USE: node create.js <title> <category> <place> <price> [photoURL]");
  process.exit(1);
}

const price = Number(priceArg);
if (isNaN(price)) {
  console.error("ERROR: 'price' must be a number");
  process.exit(1);
}

const dataDir = path.join("src", "data");
const servicesDir = path.join(dataDir, "services");
const indexPath = path.join(dataDir, "service_index.json");

// Создаем папки, если нет
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });

// Чтение индекса
let indexData = { services: [] };
if (fs.existsSync(indexPath)) {
  indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
}

const id = Date.now().toString();
const filename = `service_${id}.json`;
const filePath = path.join(servicesDir, filename);

// Новый объект
const newService = { id, title, category, place, price, photoURL, filename };

// Сохраняем отдельный файл
fs.writeFileSync(filePath, JSON.stringify(newService, null, 2));

// Обновляем индекс
indexData.services.push({
  id, title, category, place, price, photoURL, filename
});
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

console.log(`✅ Entry added: ${title} (ID: ${id})`);

