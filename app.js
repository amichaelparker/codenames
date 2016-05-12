var request = require('request');
var cheerio = require('cheerio');
var store = [], names = [];

function getPage(callback) {
  request('https://en.wikipedia.org/wiki/List_of_Intel_codenames', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body, {
        normalizeWhitespace: true
      });
    }
    callback($);
  })
}

function pushNames(page) {
  page('td', '.wikitable').each(function () {
    store.push(page(this).text());
  })
  
  store.filter(function (element, index) {
    if (index % 5 === 0)
      return names.push(element);
  })
  getCodeName();
}

function getCodeName() {
  codeName = names[Math.floor(Math.random() * names.length)];
  console.log(codeName);
}

getPage(pushNames);