var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var forEach = require('async-foreach').forEach;
var wikiLinks = require("./data/wikiLinks.json");

var wikiPages = [];
var i = 0;
var f = "data/wikiPages.json";

forEach(wikiLinks, function(link,index, arr) {
    request(link, function(error, response, page) {
            wikiPages.push(collectData(page,link));
            i++;
            console.log("processed :" + link);
            if(index==arr.length-1){
                //console.log(wikiPages);
                fs.writeFile(f, JSON.stringify(wikiPages));
                console.log("end");
            }
    });
});


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
    
    return pageData;
}

function clearData(str) {
    str = str.trim();
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}