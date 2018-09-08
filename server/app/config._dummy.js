module.exports = {
  dev: {
    port: 10201,
    datasource: {
      countryDetailInfoDs: {
        baseURL: 'data source base url',
        apikey: 'APS_KEY',
        dataUIKeyMapping: {
          //if any mapping from UI key to source key is required
        }
      }
    }
  }
};
