import { Worker } from "worker_threads";
import { resolve } from "path";

const workerPath = resolve("src", "wt", "worker.js");

const keyword = process.argv[2]; // node spawn.js bedroom

const worker = new Worker(workerPath, {
  workerData: { keyword }
});

worker.on("message", (results) => {
  console.log(`Found ${results.length} services matching "${keyword}":`);
  console.table(results);
});

worker.on("error", (err) => console.error(err));
worker.on("exit", (code) => console.log(`Worker exited with code ${code}`));
