const express = require('express');
const router = express.Router();
const axios = require('axios');
const dsApiGenerator = require('../util/api-url-generate.js')('countryDetailInfoDs');

router.use((req, res, next) => {
  console.log(
    `detail - country with URL - ${req.originalUrl} and from ip -  ${req.ip}`
  );
  next();
});

router.get('/country/:countryCode', (req, res) => {
  try {
    axios
      .get(
        dsApiGenerator(
          req.params.countryCode,
          req.query.q.split(','),
          req.query.years
        )
      )
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
