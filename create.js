import fs from "fs";
import path from "path";

// process.argv — argument array for Node
const [,, title, category, place, priceArg, photoURL = "/Assets/Logo.png"] = process.argv;

if (!title || !category || !place || !priceArg) {
  console.error("USE: node create.js <title> <category> <place> <price> [photoURL]");
  process.exit(1);
}

const price = Number(priceArg);
if (isNaN(price)) {
  console.error("ERROR: 'price' is a digit");
  process.exit(1);
}

const dataDir = path.join("data");
const servicesDir = path.join(dataDir, "services");
const indexPath = path.join(dataDir, "service_index.json");

// Проверка директорий
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });

// Чтение индекса
let indexData = { services: [] };
if (fs.existsSync(indexPath)) {
  indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
}

const id = Date.now().toString();
const filename = `service_${id}.json`;
const filePath = path.join(servicesDir, filename);

// Проверяем, не существует ли уже такого файла
if (fs.existsSync(filePath)) {
  console.error("FS ERROR: Entry exists");
  process.exit(1);
}

// Новый объект
const newService = { id, title, category, place, price, photoURL };

// Сохраняем в отдельный файл
fs.writeFileSync(filePath, JSON.stringify(newService, null, 2));

// Добавляем в индекс
indexData.services.push({
  id,
  title,
  category,
  place,
  price,
  photoURL,
  filename,
});

// Сохраняем обновлённый индекс
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

console.log(`✅ Entry added: ${title} (ID: ${id})`);
