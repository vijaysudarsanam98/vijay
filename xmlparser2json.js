var https = require('https');
var parseString = require('xml2js').parseString;
var xml = '';
const converter = require('Json-2-csv');
const fs = require ('fs');

function xmlToJson(url, callback) {
  var req = https.get(url, function(res) {
    var xml = '';

    res.on('data', function(chunk) {
      xml += chunk;
    });

   // res.on('error', function(e) {
     // callback(e, null);
   // }); 

  //  res.on('timeout', function(e) {
     // callback(e, null);
  //  }); 

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}

var url = "https://data.gov.in/sites/default/files/Date-Wise-Prices-all-Commodity.xml"

xmlToJson(url, function(err, data) {
  if (err) {
    return console.err(err);
  }
  

 console.log(JSON.stringify(data, null, 2));
  


  
});

