var cheerio = require('cheerio');
var request = require('request');
var asyncLoop = require('node-async-loop');
var fs = require('fs');
var data = require('./data/stackOverAPI.json');
var links = [];
var unansweredCounts = [];
var tagsCount = 10;
var f = "data/finalData.json";
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
            "questions": data[i].count,
            "answeredQuestions": answeredQuestions,
            "answeredPercentage": answeredPercentage
        }
        collectedDataArr.push(collectedData);
    }
    fs.writeFile(f, JSON.stringify(collectedDataArr));
    /*
    let buffer = "hi";
    fs.open(f, 'w', function(err, fd) {  
        if (err) {
            throw 'could not open file: ' + err;
        }
    
        // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
        fs.write(fd, buffer , 1, buffer.length, null, function(err) {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, function() {
                console.log('wrote the file successfully');
            });
        });
    });*/
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
            
}