var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var f = "data/wikiLinks.json";
var hyWiki = "https://hy.wikipedia.org";
var url = "https://hy.wikipedia.org/wiki/%D4%BF%D5%A1%D5%BF%D5%A5%D5%A3%D5%B8%D6%80%D5%AB%D5%A1:%D4%BE%D6%80%D5%A1%D5%A3%D6%80%D5%A1%D5%BE%D5%B8%D6%80%D5%B8%D6%82%D5%B4";


if (fs.existsSync(f) && fs.statSync(f).size > 10) {
    var wikiLinks = require("./data/wikiLinks.json");
} else {
    fs.appendFile(f, "[]");
    var wikiLinks = [];
}

request.get(url, function(error, response, page) {

    var $ = cheerio.load(page);
    var list = $("#mw-pages a");
    var link;

    for (var i = 0; i < list.length; i++) {
        var fullUrl = hyWiki + $(list[i]).attr("href");
        if (wikiLinks.indexOf(fullUrl) < 0) {
            wikiLinks.push(fullUrl);
        }

    }

    fs.writeFile(f, JSON.stringify(wikiLinks));
    console.log(wikiLinks.length + " հատ հղում կա");
});



//process.exit();