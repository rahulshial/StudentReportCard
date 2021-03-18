const csv = require('csv-parser');
const fs = require('fs');
const neatCsv = require('neat-csv');

async function readCSV(filename) {
  return new Promise ((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if(error) {
        reject(error);
      } else {
        return resolve(neatCsv(data));
      };
    });
  });
};

async function writeJSON(outputFile, data) {
  return new Promise ((resolve, reject) => {
    fs.writeFile(outputFile, data, (error) => {
      if(error) {
        reject(error);
      } else {
        return;
      };
    });
  });
};

module.exports = {
  readCSV,
  writeJSON,
};
