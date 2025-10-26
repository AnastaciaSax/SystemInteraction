import fs from "fs";
import { Transform } from "stream";
import { resolve } from "path";

// пути к файлам
const inputPath = resolve("src/data/service_index.json"); // JSON с сервисами
const outputPath = resolve("src/data/services.csv");      // куда писать CSV

// Трансформ Stream: JSON -> CSV
const transformStream = new Transform({
  readableObjectMode: false,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk.toString());
    const csvLines = ["id,title,category,place,price,photoURL"];

    data.services.forEach((s) => {
      csvLines.push([s.id, s.title, s.category, s.place, s.price, s.photoURL].join(","));
    });

    this.push(csvLines.join("\n"));
    callback();
  }
});

// Читаем исходный JSON через поток
const readStream = fs.createReadStream(inputPath, { encoding: "utf8" });
const writeStream = fs.createWriteStream(outputPath);

readStream
  .pipe(transformStream)
  .pipe(writeStream)
  .on("finish", () => {
    console.log(`✅ Transform completed: ${outputPath} created.`);
  })
  .on("error", (err) => {
    console.error("❌ Transform error:", err.message);
  });
