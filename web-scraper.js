/**
A web scraper tool to specifically work with www.tamildict.com
*/
const Promise = require('bluebird');
const request = require('request-promise');
const htmlparser2 = require('htmlparser2');


keys = ['அ','ஆ','இ','ஈ','உ','ஊ','எ','ஏ','ஐ','ஒ','ஓ','ஔ','க','ச','ஞ','ட','த','ந','ப','ம','ய','ர','வ','ல'];

const parser = new htmlparser2.Parser({
  onopentag: function(name, attribs) {
    if (name === 'table' && attribs.class === 'eigene_tabelle') {
      console.log('Got the Table');
    }
  }
});

function scrapeWords() {
  //build the url
  var baseUrl = 'http://www.tamildict.com/tamilsearch.php?alphabet=search&by='
  var promises = [];

  keys.forEach((key) => {
    for (var i=0; i<20; i++) {
      baseUrl = baseUrl + key + '&sID=c312d7d86355af445904f9034f07c5f7&nr_page=' + i;
      break;
    }
  })
  var temp = request({
    uri: baseUrl,
    method: 'GET',
  });
  promises.push(temp);
  return promises;
}

Promise.all(scrapeWords())
  .then(function(results) {
    results.forEach((result) => {
      parser.parseComplete(result);
    });
  });
