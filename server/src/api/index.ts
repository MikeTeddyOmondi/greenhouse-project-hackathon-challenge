import express from 'express';
import csv from 'csvtojson';
import fs from 'node:fs/promises'

// import MessageResponse from '../interfaces/MessageResponse';
// import emojis from './emojis';

const router = express.Router();

router.get<{}, any>('/data', async (req, res) => {
  const csvFilePath = "./consumption-co2-per-capita-dataset.csv";
  const country = req.query.country as string;

  // Async / await usage
  const csvJsonData = await csv().fromFile(csvFilePath); // parsed as an array

  const filteredData = csvJsonData.filter(item => item.Entity === country);

  // console.log({ csvJsonData })

  res.json({
    message: filteredData,
  });
});

// router.use('/emojis', emojis);

export default router;
