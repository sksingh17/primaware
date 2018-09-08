const csv = require('csvtojson');

function CsvJsonLoader(filePath) {
  this.list;
  this.filePath=filePath;
}

CsvJsonLoader.prototype.load = function() {
  if (this.list == null) {
    csv()
      .fromFile(this.filePath)
      .then(jsonObj => {
        this.list = jsonObj;
      });
  }
};

module.exports = CsvJsonLoader;
