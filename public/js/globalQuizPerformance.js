function GenCharts(){
    // ----- XHR -----
var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(this.responseText);
            console.log(result);
            LoadChart(result);
        }
    }
    xhr.open("POST", "/adminQuizChart", true);
    xhr.send();

// Quiz -------------------------------------------------------------------------------------------------------------------------------------

function LoadChart(result){
    google.charts.load('current', {packages: ['corechart']});

    // ----- Easy -----

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
        data.addColumn('number', 'Score');
        data.addColumn('number', 'User Count');

        for (var j = 0; j < result[i].length; j++){
            data.addRow([result[i][j].score, result[i][j].count])
        }

        var options = {
            title: optionChooser[i].title,
            titleTextStyle: {
                fontSize: 15,
                bold: true,
                color: '#343a40'
            },
            annotations: {
                boxStyle: {
                    stroke: '#888'
                },  
            },
            height: '400',
            legend: 'none',
            baselineColor: 'transparent',
            colors: ['#5c3292'],
            hAxis: {
                ticks: [0,20, 40, 60, 80, 100],
                title: 'Score Distribution',
                minValue: 0,
                maxValue: 100,
                gridlines: {
                    count: 0
                },
                minorGridlines:{
                    count: 0
                }
            },
            vAxis: {
                title: 'Total Attempt by All Users',
                minValue: 0,
                viewWindowMode: 'pretty',
                gridlines: {
                    count: 5
                },
                minorGridlines: {
                    count: 0
                }
            }
        }

        var chart = new google.visualization.ColumnChart(document.getElementById(optionChooser[i].id));
        //chart.draw(data, google.charts.Line.convertOptions(options));
        chart.draw(data, options);
    };
}
}
