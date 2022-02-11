var fs = require("fs");
var csv = require("csv-parser");
const results = [];
const array = [];
const lengths = [];
const receipts = [];
const removeSpace = [];
const newest = [];

//----------------PROCESS----------------------

//get the correct data to render with {id: .... , price:....}
//render all receipts without ext
//get each receipt in the correct format {id:.... , price:....}
//compare all id's to receipt id's and the prices next to them.
//if id == id then comapre prices, if price !== price, push it to array with diff.

//----------------CORRECT----------------------

//getting corred data to render with {id:... , price: ...}
fs.createReadStream("prices.csv")
  .pipe(csv({}))
  .on("data", data => {
    results.push(data);
  })
  .on("end", () => {
    console.log("correct:", results);
  });

//----------------------------------------------
//read all subfolders
var folders = fs.readdirSync("../src/data");

//looping through subfoldrs and reading each file

for (let i = 1; i < folders.length; i++) {
  var files = fs.readdirSync("../src/data/" + folders[i]);
  var texFiles = files.map(d => d);
  var readFiles = fs.readFileSync(
    "../src/data/" + folders[i] + "/" + texFiles[i],
    "utf8"
  );
  //adding all files to a single array
  array.push(readFiles);
}
//splitting array at each break
var split_array = array.map(a => a.split("\n"));
//creating new array that removes all extra spaces and unwanted characters
for (let i = 0; i < split_array.length; i++) {
  receipts.push(
    split_array[0][i].replace(/[^\d.]/g, " ").replace(/ +(?= )/g, "")
  );
}
//-------output  [ ' 1 ',  ' 1604898223 235.42 ', ] --------
//splitting each array at empty sapce
newArr = receipts.map(d => d.split(" "));
//removing spaces and removing unwanted # such as store #
for (let i = 0; i < newArr.length; i++) {
  removeSpace.push(newArr[i].filter(e => e && e !== "1"));
}
//creating new array that has id and price attatched to each line for receipts
removeSpace.map(d => {
  newest.push({ id: d[0], price: d[1] });
});
console.log(newest[3]);
