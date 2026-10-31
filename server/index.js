import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unreadResponse } from '../shared/generator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/messages/unread', (req, res) => {
  res.json(unreadResponse());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API: http://localhost:${PORT}/messages/unread`));
