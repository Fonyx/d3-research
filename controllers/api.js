const {Router} = require('express');
const fs = require('fs')
var router = Router();


//var csv is the CSV file with headers
function csvJSON(csv){

    var lines=csv.toString().split("\r");
  
    var result = [];
  
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].replace(/\n/g, "").split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
}

router.get('/boston', async(req, res) => {
    let csvData = fs.readFileSync('C:/Users/nicka/Documents/d3-research/public/data/boston-housing.csv');
    let jsonData = csvJSON(csvData);
    return res.json(jsonData);
});


module.exports = router