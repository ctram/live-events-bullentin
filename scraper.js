const scrapeIt = require('scrape-it');
let url = 'http://www.hotclubsf.com/';

// Promise interface
scrapeIt(url, {
  events: 'div'
}).then(({ data, response }) => {
  console.log(`Status Code: ${response.statusCode}`);
  console.log(data);
});
