const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const readJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "data", file), "utf8"));

const writeJSON = (file, data) =>
  fs.writeFileSync(path.join(__dirname, "data", file), JSON.stringify(data, null, 2));


// 1. GET /  → фронтенд

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 2. GET /api/services → список услуг

app.get("/api/services", (req, res) => {
  const services = readJSON("services.json").services;
  res.json(services);
});


// 3. POST /api/cart → корзина пользователя

app.post("/api/cart", (req, res) => {
  const { userId } = req.body;
  const cart = readJSON("cart.json").cart.filter((c) => c.userId == userId);
  res.json(cart);
});


// 4. POST /api/book → добавить бронирование

app.post("/api/book", (req, res) => {
  const { userId, serviceId } = req.body;
  const data = readJSON("cart.json");

  // Проверка на дубли
if (data.cart.some(c => c.userId == userId && c.serviceId == serviceId.toString())) {
  return res.status(400).json({ error: "Service already in cart!" });
}


  const newBooking = {
    id: Date.now().toString(),
    userId,
    serviceId,
  };

  data.cart.push(newBooking);
  writeJSON("cart.json", data);

  res.json({ message: "Service added to Cart", booking: newBooking });
});


// 5. DELETE /api/book/:id → отмена брони

app.delete("/api/book/:id", (req, res) => {
  const id = req.params.id;
  const data = readJSON("cart.json");

  const newCart = data.cart.filter((c) => c.id !== id);
  if (newCart.length === data.cart.length) {
    return res.status(404).json({ error: "No service found" });
  }

  data.cart = newCart;
  writeJSON("cart.json", data);
  res.json({ message: "Service deleted from Cart" });
});


// 6. GET /api/export → разные форматы

app.get("/api/export", (req, res) => {
  const format = req.headers.accept;
  const services = readJSON("services.json").services;

  if (format.includes("application/json")) {
    res.json(services);
  } else if (format.includes("text/html")) {
    const html = `
      <html><body>
        <h2>Service list</h2>
        <ul>${services.map((s) => `<li>${s.title} (${s.place})</li>`).join("")}</ul>
      </body></html>`;
    res.type("html").send(html);
  } else if (format.includes("application/xml")) {
    const xml =
      `<?xml version="1.0"?>\n<services>\n` +
      services.map((s) => `  <service><title>${s.title}</title><place>${s.place}</place></service>`).join("\n") +
      `\n</services>`;
    res.type("xml").send(xml);
  } else {
    res.status(406).send("Format not supported. Use Accept ones: JSON / HTML / XML");
  }
});


// 7. Ошибки

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ошибка сервера!");
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
