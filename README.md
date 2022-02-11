The prices are wrong!

Oh no! A team of accountants at a huge company have discovered that customers are occasionally being charged too much or too little for various products. They've written you an angry email about it, and now you're tasked with coming up with a data report about the situation.

They've sent you a directory containing the receipts in which they suspect prices are wrong and a CSV file containing the product codes and the correct price each one should have.

A receipt is just a plaintext file with rows formatted like:

A product name
A product code
A price
A random flag character (this exists for no other reason than to confuse you)
There's also a store number listed up top.

Sometimes, items might be voided. This means that the previous line is null and void, and the customer didn't pay for it, so it won't reflect in the total. Your program should ignore these voided products. Note: all void messages will be in the this format **_ VOIDED PRODUCT [Product Code] _**

So, about that report...

The angry accountants would like you to write a program that outputs a CSV file with all the products that have been mischarged along with a count of the mischarges and a total of the mischarges:

Product Code Count Total
123 23 -32.56
454 1 +100.34
Any products that have not had any wrong charges should not be in this list. Please sort the list from low to high so the largest losses are first in the file.

Your program should take in a parameter for directory so that the angry accountants can run it over and over again on a different set of receipts if they want.

Instructions for submission
Create a application for the challenge in the programming language of your choice.
Containerize your application using docker and provide instructions on how to run the image.
The application should write the csv file locally and the application instructions should include directions for mounting a host path so that the user can obtain the csv output.
Please create a branch off of main and commit all of your code into that.
Name the branch [Your last name]-[Your first name].
If you have any questions please feel free to reach out to jonathan.morales@evolvconsulting.com.

------------ Process --------------
// 1. Add data file to app
// 2. Figure out best practice for iterating through plain text files
------ Possibilites -------
//// I think it's going to be using
fetch(data)
.then(res => res.text())
.then(d => d.setReceipts(d))

//// Have to figure out how to iterate through all files in each subDirectory though.
//// 1. Turn all .txt files into JSON files
//// 2. Just iterate through all textfiles
//// 3. Maybe keep iterating through all textfiles and add them to a JSON file (feels least efficient)

---

// 3. Create an array with correct product values to compare
// 4. Compare all product values with variable created in step 3
// 5. Capture all products that were incorrectly charged and add to the value of that product, ex(Oranges: +$31, -> +$35) due to overcharging
// 6.
