var fs = require("fs");
var csv = require("csv-parser");
let parser = require("csv-parser-sync-plus-promise");

const receipt = [];
const diff = [];
const newSplit = [];
const d = [];

//----------------PROCESS----------------------

//get the correct data to render with {id: .... , price:....}
//render all receipts without ext
//get each receipt in the correct format {id:.... , price:....}
//compare all id's to receipt id's and the prices next to them.
//if id == id then comapre prices, if price !== price, push it to array with diff.

//----------------CORRECT----------------------

//getting corred data to render with {id:... , price: ...}
let result = parser.readCsvSync("prices.csv", "utf8");

//----------------------------------------------
//read all subfolders
var folders = fs.readdirSync("../src/data");

//looping through subfoldrs and reading each file

for (let i = 1; i < folders.length; i++) {
  var files = fs.readdirSync("../src/data/" + folders[i]);

  //----------- trying to iterate through every single file vs 1 ----------------

  for (let x = 0; x < files[i].length; x++) {
    if (files[x] !== undefined) {
      receipt.push(
        fs.readFileSync("../src/data/" + folders[i] + "/" + files[x], "utf8")
      );

      array = receipt.map(d => d.split("\n"));
    }
    for (let l = 0; l < array[x].length; l++) {
      newSplit.push([
        array[x][l].replace(/[^\d.]/g, " ").replace(/ +(?= )/g, "")
      ]);
    }
  }

  //--------------------------WORKS FOR ONE----------------------------------------------------------

  //   var texFiles = files.map(d => d);
  //   var readFiles = fs.readFileSync(
  //     "../src/data/" + folders[i] + "/" + texFiles[i],
  //     "utf8"
  //   );
  //   //adding all files to a single array
  //   array.push(readFiles);
  // }
  // //splitting array at each break
  // var split_array = array.map(a => a.split("\n"));
  // //creating new array that removes all extra spaces and unwanted characters
  // for (let i = 0; i < split_array.length; i++) {
  //   receipts.push(
  //     split_array[0][i].replace(/[^\d.]/g, " ").replace(/ +(?= )/g, "");
  //   );
  // }
  // //-------output  [ ' 1 ',  ' 1604898223 235.42 ', ] --------
  // //splitting each array at empty sapce
  // newArr = receipts.map(d => d.split(" "));
  // //removing spaces and removing unwanted # such as store #
  // for (let i = 0; i < newArr.length; i++) {
  //   removeSpace.push(newArr[i].filter(e => e && e !== "1"));
  // }
  // //creating new array that has id and price attatched to each line for receipts
  // removeSpace.map(d => {
  //   newest.push({ id: d[0], price: d[1] });
  // });
  // //all idx of formatted receipt
  // for (let i = 0; i < newest.length; i++) {
  //   //remove voided items
  //   if (newest[i].id && !newest[i].price) {
  //     newest.splice(i, 0);
  //     newest.splice(i - 1, 2);
  //   }
  //   //remove any undefined id's
  //   if (!newest[i].id) {
  //     newest.splice(i, 1);
  //   }
  //   //all idx of correct prices
  //   for (let j = 0; j < result.length; j++) {
  //     //create new array of difference in prices
  //     if (newest[i].id == result[j].id) {
  //       if (result[j].price !== newest[i].price) {
  //         difference.push({
  //           id: newest[i].id,
  //           diff:
  //             Math.round(
  //               (result[j].price - newest[i].price + Number.EPSILON) * 100
  //             ) / 100
  //         });
  //       }
  //       j++;
  //     }
  //   }
}

for (let i = 0; i < newSplit.length; i++) {
  x = newSplit[i][0].split(" ");
  y = x.filter(e => e.length > 2);
  diff.push({ index: i, id: y[0], price: y[1] });

  if (diff[i] && diff[i].id == undefined) {
    newDiff = diff.filter(e => e.id != undefined);
  }
}

console.log(newDiff);
