import fs from "fs";
import { resolve } from "path";

// Получаем аргументы: node write.js "Title" "Category" "Place" "Price" "PhotoURL"
const [,, title, category, place, priceArg, photoURL = "/Assets/Logo.png"] = process.argv;

if (!title || !category || !place || !priceArg) {
  console.error("USE: node write.js <title> <category> <place> <price> [photoURL]");
  process.exit(1);
}

const price = Number(priceArg);
if (isNaN(price)) {
  console.error("❌ Price must be a digit.");
  process.exit(1);
}

// Путь к JSON
const indexPath = resolve("src/data/service_index.json");

// Проверяем наличие файла
if (!fs.existsSync(indexPath)) {
  console.error("❌ File service_index.json not found.");
  process.exit(1);
}

// Читаем текущие данные
const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

// Создаем новую услугу
const newId = Date.now().toString();
const newService = { id: newId, title, category, place, price, photoURL };

// Добавляем в массив
indexData.services.push(newService);

// Записываем обновленные данные через поток
const writeStream = fs.createWriteStream(indexPath);
writeStream.write(JSON.stringify(indexData, null, 2));
writeStream.end(() => {
  console.log(`✅ Service "${title}" added to service_index.json`);
});


