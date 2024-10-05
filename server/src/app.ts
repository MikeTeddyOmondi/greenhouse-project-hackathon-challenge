import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares';
import apiRouter from './api';
import MessageResponse from './interfaces/MessageResponse';
import path from 'path';

// import index
require('dotenv').config();

const app = express();

const staticPath = path.join(__dirname, '../../www');
app.use(express.static(staticPath));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, any>('/', (req, res) => {
  // res.json({message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",});

  res.sendFile(path.join(staticPath, 'index.html'));
});


// app.use('/api/v1', api);
app.use('/api', apiRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
