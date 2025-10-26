
import { parentPort, workerData } from "worker_threads";
import fs from "fs";
import { resolve } from "path";

const { keyword } = workerData;

const indexPath = resolve("data", "service_index.json");
const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

const results = indexData.services.filter(s =>
  s.title.toLowerCase().includes(keyword.toLowerCase())
);

parentPort.postMessage(results);
