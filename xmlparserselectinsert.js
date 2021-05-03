var https = require('https');
var parseString = require('xml2js').parseString;
var xml = '';
const converter = require('Json-2-csv');
const fs = require ('fs');
const csvjson = require('csvjson');
var csvfast = require('fast-csv');

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

    ///////*********** */
    let counter = 0; 

// let header = [];
// let data = [];
csvfast
let csvStream = csvjson.fromPath("test.csv", { headers: true })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 100)
        {
            let State=record.State;
          let District=record.District;
          let Market=record.Market;
          let Commodity=record.Commodity;
          let Variety=record.Variety;
          let Arrival_Date=record.Arrival_Date;
          let Min_x0020_Price=record.Min_x0020_Price;
          let Max_x0020_Price=record.Max_x0020_Price;
          let Modal_x0020_Price=record.Modal_x0020_Price;

            // pool.query("INSERT INTO FL_insurance_sample(policyID, statecode, county, point_latitude, point_longitude, line, construction) \
            // VALUES($1, $2, $3, $4, $5, $6, $7)", [policyID, statecode, county, point_latitude, point_longitude, line, construction], function(err){
            //     if(err)
            //     {
            //         console.log(err);
            //     }
            // });

            const pool = new Pool({
                host: "aa11bulah17jx89.cdnwzu7jnz68.us-east-1.rds.amazonaws.com",
                    user: "vijay",
                    database: "ebdb",
                    password: "Farming002*",
                    port: 5432
                });
                
                pool.query =
                    ("INSERT INTO commodity (State, District, Market, Commodity,Variety,Arrival_Date,Min_x0020_Price,Max_x0020_Price,Modal_x0020_Price) VALUES ($1, $2, $3, $4,$6,$7,$8,$9)",[State, District, Market, Commodity,Variety,Arrival_Date,Min_x0020_Price,Max_x0020_Price,Modal_x0020_Price],function(err){
                if(err)
                {
                    console.log(err);
                }
            });
                
            ++counter;
        }

        csvStream.resume();

    }).on("end", function(){
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });

    ///////************* */
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
