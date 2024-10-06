import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv'
import cors from 'cors';

// import MessageResponse from './interfaces/MessageResponse';
import * as middlewares from './middlewares';
import apiRouter from './api';
import path from 'path';

dotenv.config();

const app = express();

const staticPath = path.join(__dirname, '../../www');
app.use(express.static(staticPath));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, any>('/', (req, res) => {
  res.json({message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",});
});

app.use('/api', apiRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
