var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var engines = require('consolidate');

var app = express();
var store = [], names = [];

var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address,
    server.address().port);
  console.log('Press Ctrl+C to quit.');
});

app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
  res.render('index', { header: 'Refresh to grab another random code name' });
  //getPage(pushNames);
})

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
  document.getElementByTagName('h2').text(names[Math.floor(Math.random() * names.length)]);
}