var cheerio = require('cheerio');
var request = require('request');
var asyncLoop = require('node-async-loop');
var data = require('./data/stackOverAPI.json');
var links = [];
var unansweredCounts = [];
var tagsCount = 20;


function collectData(innerPage) {
    var $ = cheerio.load(innerPage);
    var summarycount = $(".summarycount").text();

    return summarycount;
}

for (i = 0; i < tagsCount; i++) {
    links.push("https://stackoverflow.com/unanswered/tagged/" + data[i].name);
}
var i = 0;
console.log("Processing...");

asyncLoop(links, function (item, next) {
    i++;
    request(item, function (error, responce, page) {
        unansweredCounts.push(collectData(page));
        if (i != tagsCount) {
            next();
        }
        else {
            loop();
        }
    });
});

function loop() {
    for (i = 0; i < tagsCount; i++) {
        var _count = data[i].count;
        var count = _count.toLocaleString(
            'en-US',
            { minimumFractionDigits: 0 }
        );
        var _answeredQuestions = parseInt(_count) - parseInt(clearData(unansweredCounts[i]));
        var answeredQuestions = _answeredQuestions.toLocaleString(
            'en-US',
            { minimumFractionDigits: 0 }
        );
        var _answeredPercentage = (_answeredQuestions * 100) / _count;
        var answeredPercentage = Math.round(_answeredPercentage * 10) / 10
        console.log(i + 1 + ":" + data[i].name + ", " + count + " questions" + ", " + answeredQuestions + " answered questions" + ", " + answeredPercentage + "% answered");
    }
}


function clearData(str) {
    str = str.trim();
    return str.replace(",", "");
}