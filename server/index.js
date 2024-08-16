const express = require('express');
const path = require('path');
const { getAllAnimals } = require('./parser'); // Импортируйте функцию парсера
const app = express();
const port = process.env.PORT || 3000;

// Обслуживание статических файлов из папки client
app.use(express.static(path.join(__dirname, '../client')));

// Пример простого маршрута
app.get('/api/example', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Эндпоинт для получения данных о животных
app.get('/api/animals', async (req, res) => {
  try {
    const animals = await getAllAnimals();
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching animal data' });
  }
});

// Обслуживание фронтенда
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/PawsWatchPage.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});