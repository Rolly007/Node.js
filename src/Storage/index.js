var express = require('express');
var path = require('path');
var fs = require('fs');



module.exports = {
    getData : () => {
        var dataPath = __dirname + path.join('/data.json');

        console.log(dataPath);
        var datos = fs.readFile(dataPath, 'utf8', function(err, data){
          var response = (JSON.parse(data));
          console.log(response);
          return response;
        })

        /*return new Promise(function(resolve, reject){
        fs.readFile(dataPath, 'utf8', function(err, data){
          if(err){reject(err)}
          else{
            resolve(JSON.parse(data));
            console.log(data);
          }
        })
      })*/
  }
}
