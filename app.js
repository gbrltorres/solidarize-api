import 'dotenv/config';
import router from './src/controllers/router.js';
import express from 'express';
import connectToDatabase from './src/api/database.js';

const app = express();

connectToDatabase();

app.use(router)
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
