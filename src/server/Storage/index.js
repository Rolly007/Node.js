const fs = require('fs');
const path = require('path');

module.exports = {
  getAllData : () => {
    let self = this;
    let dataPath = __dirname + path.join('/data.json');
    return new Promise((resolve,reject) => {
      fs.readFile(dataPath, 'utf8', (err, readData) =>{
        if(err) reject(err)
        resolve(JSON.parse(readData));
      });
    });
  }
};
