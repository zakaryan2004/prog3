$(document).ready(function () {
    var data;
    var dataCount = 10;

    google.charts.load('current', { 'packages': ['table', 'corechart', 'bar'] });
    google.charts.setOnLoadCallback(drawTable);
    google.charts.setOnLoadCallback(drawQuestionsChart);
    google.charts.setOnLoadCallback(drawAnsweredQuestionChart);
    google.charts.setOnLoadCallback(drawQuestionBar);
    google.charts.setOnLoadCallback(drawAnsweredPercentBar);

    function drawTable() {
        $.getJSON('finalData.json', function (json) {
            data = new google.visualization.DataTable(json);
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Questions');
            data.addColumn('number', 'Answered Questions');
            data.addColumn('number', 'Percentage Answered');

            for (var i = 0; i < dataCount; i++) {
                data.addRow(
                    [json[i].name,
                    { v: json[i].v_questions, f: json[i].f_questions },
                    { v: json[i].v_answeredQuestions, f: json[i].f_answeredQuestions },
                    { v: json[i].v_answeredPercentage, f: json[i].f_answeredPercentage + "%" }]);
            }

            var table = new google.visualization.Table(document.getElementById('table_div'));
            var options = {
                showRowNumber: true,
                width: "100%"
            };

            table.draw(data, options);
        });
    }

    function drawQuestionsChart() {
        $.getJSON('finalData.json', function (json) {
            data = new google.visualization.DataTable(json);
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Questions');

            for (var i = 0; i < json.length; i++) {
                data.addRow(
                    [json[i].name,
                    { v: json[i].v_questions, f: json[i].f_questions }]);
            }

            var table = new google.visualization.PieChart(document.getElementById('questionChart_div'));
            var options = {
                legend: 'left',
                title: 'All Questions',
                sliceVisibilityThreshold: .015
            };

            table.draw(data, options);
        });
    }

    function drawAnsweredQuestionChart() {
        $.getJSON('finalData.json', function (json) {
            data = new google.visualization.DataTable(json);
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Percentage Answered');

            for (var i = 0; i < json.length; i++) {
                data.addRow([json[i].name, { v: json[i].v_answeredQuestions, f: json[i].f_answeredQuestions }]); //,{v:json[i].v_answeredPercentage, f:json[i].f_answeredPercentage + "%"}
            }

            var table = new google.visualization.PieChart(document.getElementById('answeredChart_div'));
            var options = {
                legend: 'left',
                title: 'Answered Questions',
                sliceVisibilityThreshold: .015
            };

            table.draw(data, options);
        });
    }
    
    function drawQuestionBar() {
        $.getJSON('finalData.json', function (json) {
            data = new google.visualization.DataTable(json);
            data.addColumn('string', 'Name');
            data.addColumn('number', 'All Questions');
            data.addColumn('number', 'Answered Questions');

            for (var i = 0; i < dataCount; i++) {
                data.addRow([json[i].name, { v: json[i].v_questions, f: json[i].f_questions }, { v: json[i].v_answeredQuestions, f: json[i].f_answeredQuestions }]);
            }

            var options = {
                width: 800,
                chart: {
                    title: 'Popularity of Programming Languages'
                },
                bars: 'horizontal', // Required for Material Bar Charts.
            };
            var table = new google.charts.Bar(document.getElementById('answeredBar_div'));

            table.draw(data, options);
        });
    }

    function drawAnsweredPercentBar() {
        $.getJSON('finalData.json', function (json) {
            data = new google.visualization.DataTable(json);
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Percentage of Answered Questions');

            for (var i = 0; i < dataCount; i++) {
                data.addRow([json[i].name, { v: json[i].v_answeredPercentage, f: json[i].f_answeredPercentage + "%" }]);
            }

            var options = {
                width: 800,
                chart: {
                    title: 'A peek to the percentage of Answered Questions of top Programming Languages.'
                },
                bars: 'horizontal', // Required for Material Bar Charts.
            };
            var table = new google.charts.Bar(document.getElementById('answeredPercentBar_div'));

            table.draw(data, options);
        });
    }

    $(window).resize(function () {
        drawQuestionsChart();
        drawAnsweredQuestionChart();
        drawAnsweredPercentBar();
        drawQuestionBar();
        drawTable();
        drawQuestionBar();
        drawAnsweredPercentBar();
    });
});