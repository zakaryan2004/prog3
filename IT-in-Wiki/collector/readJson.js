var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var data = require('./data/stackOverAPI.json');
var link1 = "https://stackoverflow.com/unanswered/tagged/javascript";
var link;

function collectData(innerPage, currURL) {
    //console.log("collectData");
    var pageData;
    var subTitlesArr = [];

    var $ = cheerio.load(innerPage);

   /* $(".summarycount al").each(function() {
        console.log(clearData($(this).text()));
    });*/

    var summarycount = $(".summarycount").text();
    
    return summarycount;
}

for(i = 0; i < 7;i++)
{
    link = "https://stackoverflow.com/unanswered/tagged/" + data[i].name;
    
    request(link, function(error, response, page) { 

            //console.log(collectData(page,link));        
            //link = "https://stackoverflow.com/unanswered/tagged/" + data[i].name;
            var _count = data[i].count;
            var count = _count.toLocaleString(
                'en-US', // use a string like 'en-US' to override browser locale
                { minimumFractionDigits: 0 }
              );   
              //var answeredQuestions = parseInt(_count) - parseInt(clearData(collectData(page,link)));
              //console.log(i+1 + ":" + data[i].name + ", "+ count + " questions" + ", "+ parseInt(_count) - parseInt(collectData(page,link)) +" answered questions");
              //console.log(answeredQuestions);
              console.log(link);         
                     
        function clearData(str) {
            str = str.trim();
            return str.replace(",", "");
        }
    });
}



