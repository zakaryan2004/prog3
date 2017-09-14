var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var forEach = require('async-foreach').forEach;
var link = ["https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&filter=!bNKX0pf0krrMgC"]
//var wikiLinks = require("./data/wikiLinks.json");

var pages = [];
var i = 0;
var f = "data/stackOverAPI.json";
forEach(link, function(link,index, arr) {
    request(link, function(error, response, page) {
            pages.push(collectData(page,link));
            i++;
            console.log("processed :" + link);
            console.log("proc:" + collectData(page,link));
            fs.writeFile(f, pages);
    });
});


//fs.writeFile(f,)
/*
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
*/

function collectData(innerPage, currURL) {
    //console.log("collectData");
    var pageData;    
    var $ = cheerio.load(innerPage);
    var pre = $("#pre").text()
    console.log(pre);
    return pre;
}


/*
function clearData(str) {
    str = str.trim();
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}
*/