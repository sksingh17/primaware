const config = require('../config')[process.env.NODE_ENV || 'dev'];
console.log(process.env.NODE_ENV || 'dev');
module.exports = datasource => {
  if (datasource == 'countryDetailInfoDs') {
    return (countryCode, dataKey, years) => {
      let data_key = '';
      dataKey.forEach((element, index) => {
        data_key =
          data_key +
          (config.datasource[datasource].dataUIKeyMapping[element] ||
            element);
        if (index < dataKey.length - 1) {
          data_key = data_key + ',';
        }
      });
      let url = `${config.datasource[datasource].baseURL}?api_key=${
        config.datasource[datasource].apikey
      }&countries=${countryCode}&data=${data_key}&years=${years}`;
      console.log(`${datasource} url - ${url}`);
      return url;
    };
  }
};
