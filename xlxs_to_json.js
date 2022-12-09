import xlsx from "xlsx";
import fs from "fs";

const wb = xlsx.readFile("./Apps500DataSet.xlsx");
const ws = wb.Sheets["Sheet1"];
//console.log(ws);

const data = xlsx.utils.sheet_to_json(ws);
fs.writeFile("./data.json", JSON.stringify(data), function (err) {
  if (err) console.log(err);
  else {
    console.log("Done");
  }
});

//console.log(data);
