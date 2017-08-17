var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var wikiLinks = require("./data/wikiLinks.json");

var wikiPages = [];
var i = 0;
var f = "data/wikiPages.json";

__request(wikiLinks[0]);

function __request(currURL) {
    if (wikiLinks.length == i) {
        fs.writeFile(f, JSON.stringify(wikiPages));
        return;
    } else {
        request.get(currURL, function(error, response, page) {
            currURL = wikiLinks[i++];
            collectData(page, currURL);
            console.log("processed :" + currURL);
            __request(currURL);

        });

    }
}


function collectData(innerPage, currURL) {
    //console.log("collectData");
    var pageData;
    var subTitlesArr = [];

    var $ = cheerio.load(innerPage);
    var title = $("#firstHeading").text();
    var words = $("#content").text().split(" ");
    var links = $("#content a");
    var imgs = $("#content img");

    $(".mw-headline").each(function() {
        subTitlesArr.push(clearData($(this).text()));
    });

    pageData = {
        "id": i,
        "title": title,
        "wordsCount": words.length,
        "linksCount": links.length,
        "imagesCount": imgs.length,
        "subTitles": subTitlesArr,
        "url": currURL
    };

    wikiPages.push(pageData);
    //console.log(wikiPages);
}

function clearData(str) {
    str = str.trim();
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}