// ----- XHR -----
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200){
        var result = JSON.parse(this.responseText);
        LoadChart(result)

    }
}
xhr.open("POST", "/userQuizChart", false);
xhr.send();

// Quiz --------------------------------------------------------------------------------------------------------------

function LoadChart(result){
    google.charts.load('current', {packages: ['corechart']});

    var optionChooser = [
        {
            title: 'Quiz Scores (Easy)',
            id: 'chart-easy' 
        },
        {
            title: 'Quiz Scores (Normal)',
            id: 'chart-normal'
        },
        {
            title: 'Quiz Scores (Hard)',
            id: 'chart-hard'
        }
    ]

    var count = 0;

    google.charts.setOnLoadCallback(createChart);
    google.charts.setOnLoadCallback(createChart);
    google.charts.setOnLoadCallback(createChart);

    function createChart(){
        drawChart(optionChooser, count);
        count++;
    }

    function drawChart(optionChooser, i){
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Attempt');
        data.addColumn('number', 'Score');

        for (var j = 0; j < result[i].length; j++){
            data.addRow([(j+1), result[i][j]]);
        }


        var options = {
            title: optionChooser[i].title,
            titleTextStyle: {
                fontSize: 15,
                bold: true,
                color: '#343a40'
            },
            legend: 'none',
            lineWidth: 2,
            colors: ['#5c3292'],
            pointSize: 20,
            pointShape: {
                type: 'star',
                sides: 5,
                dent: 0.5,
            },
            hAxis: {
                title: 'Attempt',
                minValue: 0,
                gridlines: {
                    count: 0
                },
                ticks: 1
            },
            vAxis: {
                title: 'Score',
                minValue: 0,
                maxValue: 100,
                viewWindowMode: 'pretty',
                gridlines: {
                    count: 5
                },
                minorGridlines: {
                    count: 0
                }
            }
        }

        var chart = new google.visualization.LineChart(document.getElementById(optionChooser[i].id));
        //chart.draw(data, google.charts.Line.convertOptions(options));
        chart.draw(data, options);
    };
}