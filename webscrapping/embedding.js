import fs from "fs";
import fields from "./fields.js";
import safetyData from "./safetyDataPreety.js";

// ************ GENERATE EMBEDDING ************

let res = "";

// ******* Embedding 2 *******

// for (var i = 0; i < safetyData.length; i++) {
//   let temp = safetyData[i].companyCategory;
//   for (var j = 0; j < fields.length; j++) {
//     if (
//       fields[j] == "Data is encrypted in transit" ||
//       fields[j] == "Data can’t be deleted" ||
//       fields[j] == "You can request that data be deleted" ||
//       fields[j] == "Independent security review"
//     ) {
//       if (safetyData[i][fields[j]].length == 1) {
//         temp += ",1";
//       } else temp += ",0";
//     } else {
//       for (var k = 0; k < purpose.length; k++) {
//         //console.log(safetyData[i][fields[j]].includes(purpose[k]));
//         if (safetyData[i][fields[j]].includes(purpose[k])) {
//           temp += ",1";
//         } else temp += ",0";
//       }
//     }
//   }
//   res += temp;
//   res += "\n";
// }

// ******* Embedding 3 *******

for (var i = 0; i < safetyData.length; i++) {
  let temp = safetyData[i].companyCategory;
  // Data Shared
  for (var j = 0; j < fields.length; j++) {
    let len = 0;
    if (safetyData[i].dataShared[fields[j]] != undefined) {
      len = safetyData[i].dataShared[fields[j]].length;
    }
    temp += "," + len;
  }
  // Data Collected
  for (var j = 0; j < fields.length; j++) {
    let len = 0;
    if (safetyData[i].dataCollected[fields[j]] != undefined) {
      len = safetyData[i].dataCollected[fields[j]].length;
    }
    temp += "," + len;
  }
  res += temp;
  res += "\n";
}

// ******* Embedding 4 *******

// for (var i = 0; i < safetyData.length; i++) {
//   let temp = safetyData[i].companyCategory;
//   for (var j = 0; j < fields.length; j++) {
//     if (
//       fields[j] == "Data is encrypted in transit" ||
//       fields[j] == "Data can’t be deleted" ||
//       fields[j] == "You can request that data be deleted" ||
//       fields[j] == "Independent security review"
//     ) {
//       if (safetyData[i][fields[j]].length == 1) {
//         temp += ",1";
//       } else temp += ",0";
//     } else {
//       var len = safetyData[i][fields[j]].length;
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

fs.writeFile("./embedding.csv", res, function (err) {
  if (err) console.log(err);
  else {
    console.log("Done");
  }
});

//console.log(data);
