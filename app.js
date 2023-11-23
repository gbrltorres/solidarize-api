import 'dotenv/config';
import router from './src/api/index.js';
import express from 'express';
import connectToDatabase from './src/config/database.js';
import sessionConfig from './src/config/sessionConfig.cjs';
import session from 'express-session';
import cors from 'cors';

const app = express();

connectToDatabase();

app.use(express.json());
app.use(session(sessionConfig));
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));
app.use(router)
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
