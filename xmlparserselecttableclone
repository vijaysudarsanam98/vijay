var https = require('https');
var parseString = require('xml2js').parseString;
var xml = '';
const converter = require('Json-2-csv');
const fs = require ('fs');
const csvjson = require('csvjson');

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

const writeFile = async function (data, fileName) {
  try {
      fs.writeFileSync(fileName, data, 'utf-8');
  }
  catch (err) {
  //sentry.captureException(err);
      console.log(err);
}
return;
}

xmlToJson(url, function(err, data) {
  if (err) {
    return console.err(err);
  }
  
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
    
    var value = data['soap:Envelope']['soap:Body'][0]['showResponse'][0]['showResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['Table'];
    //console.log(JSON.stringify(value, null, 2));
    ////////////////////////////////////
    const csvData = csvjson.toCSV(JSON.stringify(value, null, 2), {
      headers: 'key',
      delimiter : '^'
    });
    writeFile(csvData, "test.csv");
    //////////////////////////////////////////

   // var value = Table.diffgridTable1,
   // length = TableArray.length;

// for(var i = 0; i < length; i++)
// {
//     // You can access the customers array from here - 
//     console.log(TableArray[i]. diffgridTable1[0]); // [0] hardcoded because as you can see all the variables are in array at 0th position 
//    // similarly you can access other data 

// }

    
   
    
  });
  
  


  
});
