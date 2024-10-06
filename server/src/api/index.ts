import express from 'express';
import csv from 'csvtojson';

const router = express.Router();

router.get<{}, any>('/data', async (req, res) => {
  const perCapitaCsv = "./data/consumption-co2-per-capita-dataset.csv";
  const country = req.query.country as string;

  const perCapitaCsvJson = await csv().fromFile(perCapitaCsv); // parsed as an array
  // console.log({ perCapitaCsvJson })

  const filteredData = perCapitaCsvJson.filter(item => item.Entity === country);

  res.json({
    message: country ? filteredData : perCapitaCsvJson,
  });
});

router.get<{}, any>('/emissions-by-sector', async (req, res) => {
  const perSectorCsv = "./data/co2-emissions-by-sector.csv";

  const perSectorCsvJson = await csv().fromFile(perSectorCsv); // parsed as an array
  // console.log({ perSectorCsvJson })

  res.json({
    message: perSectorCsvJson,
  });
});

export default router;
