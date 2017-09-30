$(document).ready(function () {
    var data;
    google.charts.load('current', { 'packages': ['table','corechart'] });
    google.charts.setOnLoadCallback(drawTable);
    google.charts.setOnLoadCallback(drawQuestionsChart);
    google.charts.setOnLoadCallback(drawAnsweredChart);

    function drawTable() {
        $.getJSON('finalData.json', function (json) {
            data = new google.visualization.DataTable(json);

            data.addColumn('string', 'Name');
            data.addColumn('number', 'Questions');      
            data.addColumn('number','Answered Questions');
            data.addColumn('number', 'Percentage Answered');              
            for(var i = 0;i< json.length;i++)
            {
                data.addRow(
                    [json[i].name,
                    {v:json[i].v_questions, f:json[i].f_questions},
                    {v:json[i].v_answeredQuestions,f:json[i].f_answeredQuestions},                    
                    {v:json[i].v_answeredPercentage, f:json[i].f_answeredPercentage + "%"}]);
            }
            /*
            data.addRows([
                ['Mike', { v: 10000, f: '$10,000' }, true],
                ['Jim', { v: 8000, f: '$8,000' }, false],
                ['Alice', { v: 12500, f: '$12,500' }, true],
                ['Bob', { v: 7000, f: '$7,000' }, true]
            ]);
            */
            var table = new google.visualization.Table(document.getElementById('table_div'));
            table.draw(data, { showRowNumber: true,width:"100%"});
        });
    }

    function drawQuestionsChart() {
        $.getJSON('finalData.json', function (json) {
            data = new google.visualization.DataTable(json);

            data.addColumn('string', 'Name');
            data.addColumn('number', 'Questions');   
            for(var i = 0;i< json.length;i++)
            {
                data.addRow(
                    [json[i].name,
                    {v:json[i].v_questions, f:json[i].f_questions}]);
                console.log(json[i].f_answeredQuestions);
            }
            /*
            data.addRows([
                ['Mike', { v: 10000, f: '$10,000' }, true],
                ['Jim', { v: 8000, f: '$8,000' }, false],
                ['Alice', { v: 12500, f: '$12,500' }, true],
                ['Bob', { v: 7000, f: '$7,000' }, true]
            ]);
            */
            var table = new google.visualization.PieChart(document.getElementById('questionChart_div'));
            table.draw(data, { legend: 'left',title: 'All Questions'});
        });
    }

    function drawAnsweredChart() {
        $.getJSON('finalData.json', function (json) {
            data = new google.visualization.DataTable(json);

            data.addColumn('string', 'Name');
            data.addColumn('number', 'Answered Questions');      
            //data.addColumn('number', 'Percentage Answered');              
            for(var i = 0;i < json.length;i++)
            {
                data.addRow([json[i].name,{v:json[i].v_answeredQuestions, f:json[i].f_answeredQuestions}]); //,{v:json[i].v_answeredPercentage, f:json[i].f_answeredPercentage + "%"}
            }
            /*
            data.addRows([
                ['Mike', { v: 10000, f: '$10,000' }, true],
                ['Jim', { v: 8000, f: '$8,000' }, false],
                ['Alice', { v: 12500, f: '$12,500' }, true],
                ['Bob', { v: 7000, f: '$7,000' }, true]
            ]);
            */
            var table = new google.visualization.PieChart(document.getElementById('answeredChart_div'));
            table.draw(data, { legend: 'left',title: 'Answered Questions'});
        });
    }
    /*var data;
    var collDataArr = [];
    var div = $("</div>").attr("id","collData").appendTo("body");
    var p = $("</p>").attr("id","collectedP").appendTo("body")
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    
    //usage:
    readTextFile("finalData.json", function(text){
        data = JSON.parse(text);
        for(i = 0; i < data.length;i++)
        {
            //console.log(data[i].id + ". " + data[i].name + ", " + data[i].questions + " questions, " + data[i].answeredQuestions + " answered questions, " + data[i].answeredPercentage + "% answered");            
            var collData = data[i].id + ". " + data[i].name + ", " + data[i].questions + " questions, " + data[i].answeredQuestions + " answered questions, " + data[i].answeredPercentage + "% answered" +"<br>";
            collDataArr.push(collData);
        }     
        $("#collData").attr("text",collDataArr);
        $("#collectedP").html(collDataArr);   
    });    
*/
$(window).resize(function () {
    drawQuestionsChart();
    drawAnsweredChart();
    drawTable();
});
});