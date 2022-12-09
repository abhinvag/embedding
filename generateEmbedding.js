import xlsx from "xlsx";
import fs from "fs";
import fields from "./fields.js";

// ************ CONVERT XLSX TO JSON ************

const wb = xlsx.readFile("./Apps500DataSet.xlsx");
const ws = wb.Sheets["Sheet1"];

const data = xlsx.utils.sheet_to_json(ws);

// ************ FORMAT DATA ************

let formattedData = [];
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
  formattedData.push(obj);
}

// TODO: REMOVE DUPLICATES

var data2 = [];
var seen = {};

for (var i = 0; i < formattedData.length; i++) {
  let temp = formattedData[i].compamyName;
  // Convert the string to lowercase
  temp = temp.toLowerCase();
  // Replace all line breaks with the empty string
  temp = temp.replace(/\n/g, "");
  // Replace all spaces with the empty string
  temp = temp.replace(/\s/g, "");
  console.log(temp);
  if (seen[temp] == undefined) {
    data2.push(formattedData[i]);
    seen[temp] = true;
  }
}

//console.log(seenName);

// ************ GENERATE EMBEDDING ************

let res = "";

// ******* Embedding 2 *******

// for (var i = 0; i < data2.length; i++) {
//   let temp = data2[i].companyCategory;
//   for (var j = 0; j < fields.length; j++) {
//     if (
//       fields[j] == "Data is encrypted in transit" ||
//       fields[j] == "Data can’t be deleted" ||
//       fields[j] == "You can request that data be deleted" ||
//       fields[j] == "Independent security review"
//     ) {
//       if (data2[i][fields[j]].length == 1) {
//         temp += ",1";
//       } else temp += ",0";
//     } else {
//       for (var k = 0; k < purpose.length; k++) {
//         //console.log(data2[i][fields[j]].includes(purpose[k]));
//         if (data2[i][fields[j]].includes(purpose[k])) {
//           temp += ",1";
//         } else temp += ",0";
//       }
//     }
//   }
//   res += temp;
//   res += "\n";
// }

// ******* Embedding 3 *******

for (var i = 0; i < data2.length; i++) {
  let temp = data2[i].companyCategory;
  for (var j = 0; j < fields.length; j++) {
    if (
      fields[j] == "Data is encrypted in transit" ||
      fields[j] == "Data can’t be deleted" ||
      fields[j] == "You can request that data be deleted" ||
      fields[j] == "Independent security review"
    ) {
      if (data2[i][fields[j]].length == 1) {
        temp += ",1";
      } else temp += ",0";
    } else {
      var len = data2[i][fields[j]].length;
      temp += "," + len;
    }
  }
  res += temp;
  res += "\n";
}

// ******* Embedding 4 *******

// for (var i = 0; i < data2.length; i++) {
//   let temp = data2[i].companyCategory;
//   for (var j = 0; j < fields.length; j++) {
//     if (
//       fields[j] == "Data is encrypted in transit" ||
//       fields[j] == "Data can’t be deleted" ||
//       fields[j] == "You can request that data be deleted" ||
//       fields[j] == "Independent security review"
//     ) {
//       if (data2[i][fields[j]].length == 1) {
//         temp += ",1";
//       } else temp += ",0";
//     } else {
//       var len = data2[i][fields[j]].length;
//       if (fields[j].includes("Optional") || fields[j].includes("(Optional)")) {
//         len *= 5;
//       } else {
//         len *= 10;
//       }
//       temp += "," + len;
//     }
//   }
//   res += temp;
//   res += "\n";
// }

// ************ WRITE TO FILE ************

fs.writeFile("./embedding750-test.csv", res, function (err) {
  if (err) console.log(err);
  else {
    console.log("Done");
  }
});

//console.log(data);
