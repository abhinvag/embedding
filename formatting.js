import data from "./data.js";
import fields from "./fields.js";
import fs from "fs";

//let similarity = {};

let res = [];
var i = 0;

while (i < data.length) {
  var obj = {};
  if (data[i].Company != undefined) {
    var companyName = String(data[i].Company);
    var companyCategory = String(data[i].Category);
    obj.compamyName = companyName;
    obj.companyCategory = companyCategory;
    for (var j = 0; j < fields.length; j++) {
      obj[fields[j]] = [];
      if (data[i][fields[j]] != undefined) {
        obj[fields[j]].push(data[i][fields[j]]);
      }
    }
    i++;
    while (data[i] != undefined && data[i].Company == undefined) {
      for (var j = 0; j < fields.length; j++) {
        if (data[i][fields[j]] != undefined) {
          obj[fields[j]].push(data[i][fields[j]]);
        }
      }
      i++;
    }
  }
  res.push(obj);
}

fs.writeFile(
  "./embedding/dataFormatted.txt",
  JSON.stringify(res),
  function (err) {
    if (err) console.log(err);
    else {
      console.log("Done");
    }
  }
);

//console.log(res);
