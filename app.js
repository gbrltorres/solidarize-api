require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./src/api/database');

const app = express();

connectToDatabase();

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
