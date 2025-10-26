import { parentPort, workerData } from "worker_threads";
import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from 'url';

const { keyword } = workerData;

// Получаем директорию текущего файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Путь к index
const indexPath = resolve(__dirname, "../data/service_index.json");

// Чтение данных
const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

// Фильтруем по ключевому слову
const results = indexData.services.filter(s =>
  s.title.toLowerCase().includes(keyword.toLowerCase()) ||
  s.place.toLowerCase().includes(keyword.toLowerCase())
);

// Отправляем результат обратно в главный поток
parentPort.postMessage(results);


