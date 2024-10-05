import express from 'express';
import csv from 'csvtojson';
import fs from 'node:fs/promises'

// import MessageResponse from '../interfaces/MessageResponse';
// import emojis from './emojis';

const router = express.Router();

router.get<{}, any>('/data', async (req, res) => {
  const csvFilePath = "./consumption-co2-per-capita-dataset.csv";

  // Async / await usage
  const csvJsonData = await csv().fromFile(csvFilePath); // parsed as an array
  console.log({ csvJsonData })

  res.json({
    message: csvJsonData,
  });
});

// router.use('/emojis', emojis);

export default router;
