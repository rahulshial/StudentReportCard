const csv = require('csv-parser');
const fs = require('fs');
const neatCsv = require('neat-csv');

async function readStudents(studentsFile) {
  return new Promise ((resolve, reject) => {
    fs.readFile(studentsFile, (error, data) => {
      if(error) {
        reject(error);
      } else {
        return resolve(neatCsv(data));
      };
    });
  });
};

async function readCourses(coursesFile) {
  return new Promise ((resolve, reject) => {
    fs.readFile(coursesFile, (error, data) => {
      if(error) {
        reject(error);
      } else {
        return resolve(neatCsv(data));
      };
    });
  });
};

async function readTests(testsFile) {
  return new Promise ((resolve, reject) => {
    fs.readFile(testsFile, (error, data) => {
      if(error) {
        reject(error);
      } else {
        return resolve(neatCsv(data));
      };
    });
  });  
};

async function readMarks(marksFile) {
  return new Promise ((resolve, reject) => {
    fs.readFile(marksFile, (error, data) => {
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
  readStudents,
  readCourses,
  readTests,
  readMarks,
  writeJSON,
};
