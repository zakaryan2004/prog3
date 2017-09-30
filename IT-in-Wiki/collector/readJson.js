var cheerio = require('cheerio');
var request = require('request');
var asyncLoop = require('node-async-loop');
var fs = require('fs');
var data = require('./data/stackOverAPI.json');
var links = [];
var unansweredCounts = [];
var tagsCount = 100;
var f = "../dataAPI/public/finalData.json";
var collectedDataArr = [];
var testArr = [1];

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
            writeToJson();
        }
    });
});

function clearData(str) {
    str = str.trim();
    return str.replace(",", "");
}

function writeToJson() {
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
        var collectedData = {
            "id": i + 1,
            "name": data[i].name,
            "v_questions": _count,
            "f_questions": count,            
            "v_answeredQuestions": _answeredQuestions,
            "f_answeredQuestions": answeredQuestions,
            "v_answeredPercentage": _answeredPercentage,            
            "f_answeredPercentage": answeredPercentage
        }
        collectedDataArr.push(collectedData);
    }
    fs.writeFile(f, JSON.stringify(collectedDataArr));
    /*
    var position = 0;
    var file_path = f;

    var new_text = '{"data": ';

    fs.readFile(file_path, function read(err, data) {
        if (err) {
            throw err;
        }
        var file_content = data.toString();
        file_content = file_content.substring(position);
        var file = fs.openSync(file_path, 'r+');
        var bufferedText = new Buffer(new_text + file_content);
        fs.write(file, bufferedText, 0, bufferedText.length);
        fs.appendFile(file_path, "}"); 
        fs.close(file);        
    });
    */
}