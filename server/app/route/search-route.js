const express = require('express');
const router = express.Router();
const countryListCsvFilePath =
  __dirname + '\\..\\dataset\\country-code-name-list.csv';
const CsvJsonLoader = require('../loader/csv-json-loader');

countryDataSource = new CsvJsonLoader(countryListCsvFilePath);
countryDataSource.load();

router.use((req, res, next) => {
  console.log(
    `search - country with URL - ${req.originalUrl} and from ip -  ${req.ip}`
  );
  next();
});

router.get('/country', (req, res) => {
  if (req.query.q_start) {
    let filterCountryList = countryDataSource.list.filter(entity => {
      return (
        entity.name.toLowerCase().startsWith(req.query.q_start.toLowerCase()) ||
        entity.code.toLowerCase().startsWith(req.query.q_start.toLowerCase())
      );
    });
    res.send(filterCountryList);
  } else if (req.query.q_any) {
    let filterCountryList = countryDataSource.list.filter(entity => {
      return (
        entity.name.toLowerCase().includes(req.query.q_any.toLowerCase()) ||
        entity.code.toLowerCase().includes(req.query.q_any.toLowerCase())
      );
    });
    res.send(filterCountryList);
  } else {
    res.send(countryDataSource.list);
  }
});

module.exports = router;
