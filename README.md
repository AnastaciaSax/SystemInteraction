 🧪 Тестовые сценарии. Postman

## 📌 Базовая настройка
- **Base URL:** `http://localhost:5000/api`
- **Content-Type:** `application/json`

## 🔍 Health Check

### Проверка работоспособности сервера
**Request:**
```http
GET /health
Expected Response (200 OK):

json
{
  "success": true,
  "message": "Server is running!"
}
🌍 Тестовые сценарии для Countries
1. Получить все страны
Request:

http
GET /countries
Expected Response (200 OK):

json
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
2. Создать новую страну
Request:

http
POST /countries
Body:

json
{
  "name": "Test Country",
  "currency": "EUR"
}
Expected Response (201 Created):

json
{
  "success": true,
  "message": "Country created successfully",
  "data": {
    "id": 11,
    "name": "Test Country",
    "currency": "EUR"
  }
}
3. Получить страну по ID
Request:

http
GET /countries/1
4. Обновить страну
Request:

http
PUT /countries/1
Body:

json
{
  "name": "Updated Country",
  "currency": "USD"
}
5. Удалить страну
Request:

http
DELETE /countries/11
Expected Response (200 OK):

json
{
  "success": true,
  "message": "Country deleted successfully"
}
🗺️ Тестовые сценарии для Routes
1. Получить все маршруты
Request:

http
GET /routes
2. Создать новый маршрут
Request:

http
POST /routes
Body:

json
{
  "name": "Test Route",
  "countryId": 1,
  "price_usd": 1500,
  "duration_days": 7,
  "description": "Test description",
  "photo_url": "https://example.com/photo.jpg",
  "is_active": true
}
3. Тестирование фильтрации маршрутов
Request:

http
GET /routes?countryId=1&minPrice=1000&maxPrice=2000
Request:

http
GET /routes?search=cultural&sortBy=price_usd&sortOrder=DESC
Request:

http
GET /routes?page=1&limit=5
💰 Тестовые сценарии для Sales
1. Получить все продажи
Request:

http
GET /sales
2. Создать новую продажу
Request:

http
POST /sales
Body:

json
{
  "routeId": 1,
  "sale_date": "2024-07-20",
  "visa_cost_usd": 50,
  "quantity": 2
}
Expected Response (201 Created):

json
{
  "success": true,
  "message": "Sale created successfully",
  "data": {
    "id": 33,
    "routeId": 1,
    "sale_date": "2024-07-20",
    "visa_cost_usd": 50.00,
    "quantity": 2,
    "total_cost_usd": 2500.00
  }
}
3. Обновить продажу
Request:

http
PUT /sales/1
Body:

json
{
  "quantity": 3,
  "visa_cost_usd": 55
}
Проверить: что total_cost_usd автоматически пересчитался

4. Получить статистику продаж
Request:

http
GET /sales/stats
Request с фильтрами:

http
GET /sales/stats?startDate=2024-01-01&endDate=2024-06-30
🎯 Сценарии проверки ошибок
1. Создание страны с существующим именем
Request:

http
POST /countries
Body:

json
{
  "name": "Turkey",
  "currency": "USD"
}
Expected Response (400 Bad Request):

json
{
  "success": false,
  "message": "Error creating country",
  "error": "Validation error"
}
2. Удаление страны с привязанными маршрутами
Request:

http
DELETE /countries/1
Expected Response (400 Bad Request):

json
{
  "success": false,
  "message": "Cannot delete country with existing routes"
}
3. Создание продажи с несуществующим routeId
Request:

http
POST /sales
Body:

json
{
  "routeId": 999,
  "sale_date": "2024-07-20",
  "visa_cost_usd": 50,
  "quantity": 2
}
Expected Response (404 Not Found):

json
{
  "success": false,
  "message": "Route not found"
}
4. Отправка невалидных данных
Request:

http
POST /countries
Body:

json
{
  "name": "",
  "currency": "INVALID"
}
Expected Response (400 Bad Request):

json
{
  "success": false,
  "message": "Error creating country",
  "error": "Validation error details..."
}
