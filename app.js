import 'dotenv/config';
import router from './src/api/index.js';
import express from 'express';
import connectToDatabase from './src/config/database.js';

const app = express();

connectToDatabase();

app.use(express.json());
app.use(router)
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
