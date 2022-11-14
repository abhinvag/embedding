import data from "./dataFormatted.js";
import fields from "./fields.js";
import purpose from "./purpose.js";
import fs from "fs";

//let similarity = {};

let res = "";

// embedding 2

// for (var i = 0; i < data.length; i++) {
//   let temp = data[i].companyCategory;
//   for (var j = 0; j < fields.length; j++) {
//     if (
//       fields[j] == "Data is encrypted in transit" ||
//       fields[j] == "Data can’t be deleted" ||
//       fields[j] == "You can request that data be deleted" ||
//       fields[j] == "Independent security review"
//     ) {
//       if (data[i][fields[j]].length == 1) {
//         temp += ",1";
//       } else temp += ",0";
//     } else {
//       for (var k = 0; k < purpose.length; k++) {
//         //console.log(data[i][fields[j]].includes(purpose[k]));
//         if (data[i][fields[j]].includes(purpose[k])) {
//           temp += ",1";
//         } else temp += ",0";
//       }
//     }
//   }
//   res += temp;
//   res += "\n";
// }

// embedding 3

for (var i = 0; i < data.length; i++) {
  let temp = data[i].companyCategory;
  for (var j = 0; j < fields.length; j++) {
    if (
      fields[j] == "Data is encrypted in transit" ||
      fields[j] == "Data can’t be deleted" ||
      fields[j] == "You can request that data be deleted" ||
      fields[j] == "Independent security review"
    ) {
      if (data[i][fields[j]].length == 1) {
        temp += ",1";
      } else temp += ",0";
    } else {
      var len = data[i][fields[j]].length;
      temp += "," + len;
    }
  }
  res += temp;
  res += "\n";
}

fs.writeFile("./data.txt", res, function (err) {
  if (err) console.log(err);
  else {
    console.log("Done");
  }
});

//console.log(similarity);
