import fs from "fs";
import fields from "./fields.js";
import safetyData from "./safetyDataPreety.js";

// ************ GENERATE EMBEDDING ************

let res = "";

// ******* Embedding 1 *******

// for (var i = 0; i < safetyData.length; i++) {
//   let temp = safetyData[i].companyCategory;
//   // Data Shared
//   for (var j = 0; j < fields.length; j++) {
//     let len = 0;
//     if (safetyData[i].dataShared[fields[j]] != undefined) {
//       len = safetyData[i].dataShared[fields[j]].length;
//     }
//     if (len > 0) temp += "," + 1;
//     else temp += "," + 0;
//   }
//   // Data Collected
//   for (var j = 0; j < fields.length; j++) {
//     let len = 0;
//     if (safetyData[i].dataCollected[fields[j]] != undefined) {
//       len = safetyData[i].dataCollected[fields[j]].length;
//     }
//     if (len > 0) temp += "," + 1;
//     else temp += "," + 0;
//   }
//   res += temp;
//   res += "\n";
// }

// ******* Embedding 2 *******

// for (var i = 0; i < safetyData.length; i++) {
//   let temp = safetyData[i].companyCategory;
//   // Data Shared
//   for (var j = 0; j < fields.length; j++) {
//     let len = 0;
//     if (safetyData[i].dataShared[fields[j]] != undefined) {
//       len = safetyData[i].dataShared[fields[j]].length;
//     }
//     temp += "," + len;
//   }
//   // Data Collected
//   for (var j = 0; j < fields.length; j++) {
//     let len = 0;
//     if (safetyData[i].dataCollected[fields[j]] != undefined) {
//       len = safetyData[i].dataCollected[fields[j]].length;
//     }
//     temp += "," + len;
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
    if (fields[j].includes("Optional")) {
      len *= 5;
    } else {
      len *= 10;
    }
    temp += "," + len;
  }
  // Data Collected
  for (var j = 0; j < fields.length; j++) {
    let len = 0;
    if (safetyData[i].dataCollected[fields[j]] != undefined) {
      len = safetyData[i].dataCollected[fields[j]].length;
      if (fields[j].includes("Optional")) {
        len *= 5;
      } else {
        len *= 10;
      }
      temp += "," + len;
    }
    temp += "," + len;
  }
  res += temp;
  res += "\n";
}

// ************ WRITE TO FILE ************

fs.writeFile("./embedding3.csv", res, function (err) {
  if (err) console.log(err);
  else {
    console.log("Done");
  }
});
