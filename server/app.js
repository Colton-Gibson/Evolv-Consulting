var fs = require("fs");
let parser = require("csv-parser-sync-plus-promise");
var express = require("express");
var cors = require("cors");
var app = express();

const receipt = [];
const transaction = [];
const factoryResult = [];
const newResult = [];

//----------------PROCESS----------------------

//get the correct data to render with {id: .... , price:....}
//render all receipts without ext
//get each receipt in the correct format {id:.... , price:....}
//compare all id's to receipt id's and the prices next to them.
//if id == id then comapre prices, if price !== price, push it to array with diff.

//----------------CORRECT----------------------

//getting correct data to render with {id:... , price: ...}

const result = fs.readFileSync("prices.csv", "utf8");

//----------------------------------------------
//read all subfolders
var folders = fs.readdirSync("../src/data");

//looping through subfoldrs and reading each file

for (let i = 1; i < folders.length; i++) {
  var files = fs.readdirSync("../src/data/" + folders[i]);

  //----------- iterate through every single file of each subfolder ----------------

  for (let x = 0; x < files[i].length; x++) {
    if (files[x] !== undefined) {
      receipt.push(
        fs.readFileSync("../src/data/" + folders[i] + "/" + files[x], "utf8")
      );
      receiptArray = receipt.map(d => d.split("\n"));
    }
  }
}

// 1. read from individual file

function receiptBySku() {
  for (let i = 0; i < receiptArray.length; i++) {
    for (let s = 0; s < receiptArray[i].length; s++) {
      const string = receiptArray[s].toString();
      //get all values with 2 values after decimal
      const regexPrice = /\d+\.\d{2}/;
      const matchPrice = string.match(regexPrice);
      //get all values 8 integers and greater
      const regexId = /\d{8,}/;
      const matchId = string.match(regexId);
      //sku equal matchedID
      for (const x of matchId) {
        var sku = x;
      }
      //price equal matchedPrice
      for (const x of matchPrice) {
        var price = x;
      }
      //create new array with sku and price
      transaction.push({
        key: sku,
        value: price
      });
    }
  }
}
//run receiptBySku function
receiptBySku();

//make price.csv data into an array
factoryResult.push(result);
//split factoryResults on each break to iterate through them
resultArray = factoryResult.map(d => d.split("\n"));
//iterate through results and split them inbetween id and price
splitResultArray = resultArray[0].map(d => d.split(","));

function correctResult() {
  //format correct results just like receipts
  for (let i = 0; i < splitResultArray.length; i++) {
    const string = splitResultArray[i].map(d => d.split(",").toString());
    newResult.push({
      key: string[0],
      value: string[1]
    });
  }
}
//run function to get results in correct manner
correctResult();

const difference = [];
//function to find difference
const getDifference = () => {
  //iterate through all transactions
  for (let i = 0; i < transaction.length; i++) {
    for (let j = 0; j < newResult.length; j++) {
      //if the key of a transaction is the same as the correct data go on
      if (transaction[i].key == newResult[j].key) {
        //if the value of the transaction isn't the correct value
        if (transaction[i].value !== newResult[j].value) {
          //create a new array with values id and diff that are equal to the difference in price and the sku number
          difference.push({
            id: transaction[i].key,
            diff:
              Math.round(
                //just rounding numbers to two decimal points
                (newResult[j].value - transaction[i].value + Number.EPSILON) *
                  100
              ) / 100
          });
        }
        j++;
      }
    }
  }
};

getDifference();

var holder = {};
//adding all the skus so we don't have the same product with multiple differences
difference.forEach(function(d) {
  if (holder.hasOwnProperty(d.id)) {
    holder[d.id] =
      Math.round((holder[d.id] + d.diff + Number.EPSILON) * 100) / 100;
  } else {
    holder[d.id] = d.diff;
  }
});

var skuPriceDiff = [];
//creating new array with differences to itterate through them on the frontend
for (var prop in holder) {
  skuPriceDiff.push({ id: prop, diff: holder[prop] });
}

app.use(cors());

app.get("/", (req, res) => {
  res.send(skuPriceDiff);
});

// Start server
app.listen(5000, () => {
  console.log("App listening on port 5000");
});
