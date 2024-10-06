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

router.get<{}, any>('/emissions-by-sector/:year/:country', async (req, res) => {

  const perSectorCsv = "./data/global-warming-by-gas-and-source.csv";
  // @ts-ignore
  const year = req.params.year as string;
  // @ts-ignore
  const country = req.params.country as string;

  console.log({year, country})

  const perSectorCsvJson = await csv().fromFile(perSectorCsv); // parsed as an array
  // console.log({ perSectorCsvJson })
  const filtered = perSectorCsvJson.filter(item => item.Year === year && item.Entity === country);

  res.json({
    // message: perSectorCsvJson,
    message: filtered,
  });
});

export default router;
