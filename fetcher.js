// CLI arguments: 1) a URL, 2) a local file path
// download the resource at the URL to the local path on my machine
// when complete, print out a message: "Downloaded and saved 1235 bytes to ./index.html."

// Make an http request and wait for the response
// After the http request is complete, take the received data and write it to a file in my local filesystem

// tip: 1 character is equal to 1 byte

const args = process.argv.slice(2); //command line arguments

//create variables for command line input
const URL = args[0];
const localPath = args[1];

//Control the order of the asynch operations -- nested call backs

//make http request, wait for results...
const request = require('request');
const fs = require('fs');

request(URL, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  let content = body;

  //edge case: URL invalid
  if (response.statusCode === 404) {
    console.log("URL is invalid");
    return;
  }

  // After the http request is complete, you need to take the data you receive and write it to a file in your local filesystem
  fs.writeFile(localPath, content, err => {
    if (err) {
      console.error(err);
      return;
    }

    // handles edge case for invalid local path
    if (!localPath.includes('.html')) {
      console.log("Local path does not exist");
      return;
    }
    //file written successfully
    console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
  });
});
