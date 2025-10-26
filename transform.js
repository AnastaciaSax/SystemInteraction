import fs from "fs";
import { Transform } from "stream";
import { resolve } from "path";

// csv - table file
const inputPath = resolve("data", "service_index.json");
const outputPath = resolve("data", "services.csv");

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
const readStream = fs.createReadStream(inputPath);
const writeStream = fs.createWriteStream(outputPath);

readStream
  .pipe(transformStream)
  .pipe(writeStream)
  .on("finish", () => {
    console.log(`✅ Transform completed: ${outputPath} created.`);
  });
