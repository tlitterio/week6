// Goal: create an API for a front-end developer to consume short-term
// rental listings for a "best of Airbnb" web application. Include the 
// number of available listings and the  listings with associated data, 
// e.g. { count: 200, listings: [...] }. Include only listings with an
// overall rating of 99 or better. Accept the minimum number of bedrooms
// as a querystring parameter.

// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {

  console.log(event.queryStringParameters.bedrooms)

  // read listings CSV file from disk
  let listingsFile = fs.readFileSync(`./listings.csv`)
  
  // turn the listings file into a JavaScript object, wait for that to happen
  let listingsFromCsv = await csv(listingsFile)
  //console.log(listingsFromCsv)
  let minBebrooms = event.queryStringParameters.bedrooms
  // write the number of listings (the array's length) to the back-end console
  //console.log(`There are ${listingsFromCsv.length} listings`)

  // write the first few listings to the back-end console, to see what we're working with
  // console.log(listingsFromCsv[0])
  // console.log(listingsFromCsv[1])
  // console.log(listingsFromCsv[2])

  // create a new object to hold the count and listings data
  let listingsToReturn = {
    listings: [],
    count: 0
  }
  // start with an empty Array for the listings
  // let listings = []
  
  // loop through all listings, for each one:
    // store each listing in memory
    // check if the rating is at least 99, if so:
      // add the listing to the Array of listings to return
  for (let i=0; i < listingsFromCsv.length; i++){
    let listing = listingsFromCsv[i]
    if (listing.review_scores_rating >=99 && listing.bedrooms >= minBebrooms){
      listingsToReturn.listings.push(listing)
      listingsToReturn.count = listingsToReturn.count + 1
    }
  }

  // add the number of listings to the returned listings Object

  // a lambda function returns a status code and a string of data
  return {
    statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    body: JSON.stringify(listingsToReturn) // a string of data
  }
}