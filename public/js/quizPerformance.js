google.charts.load('current', {packages: ['corechart', 'line']});

// ----- Easy -----

google.charts.setOnLoadCallback(drawChartEasy);

function drawChartEasy(){
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Attempt');
    data.addColumn('number', 'Score');

    data.addRows([
        [1, 50],
        [2, 30],
        [3, 15],
        [4, 60],
        [5, 80],
        [6, 90],
        [7, 40]
    ]);

    var options = {
        title: 'Quiz Scores (Easy)',
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

    var chart = new google.visualization.LineChart(document.getElementById('chart-easy'));
    //chart.draw(data, google.charts.Line.convertOptions(options));
    chart.draw(data, options);
};

// ----- Normal -----

google.charts.setOnLoadCallback(drawChartNormal);

function drawChartNormal(){
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Attempt');
    data.addColumn('number', 'Score');

    data.addRows([
        [1, 50],
        [2, 30],
        [3, 15],
        [4, 60],
        [5, 80],
        [6, 90],
        [7, 40]
    ]);

    var options = {
        title: 'Quiz Scores (Normal)',
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

    var chart = new google.visualization.LineChart(document.getElementById('chart-normal'));
    //chart.draw(data, google.charts.Line.convertOptions(options));
    chart.draw(data, options);
};

// ----- Hard -----

google.charts.setOnLoadCallback(drawChartHard);

function drawChartHard(){
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Attempt');
    data.addColumn('number', 'Score');

    data.addRows([
        [1, 50],
        [2, 30],
        [3, 15],
        [4, 60],
        [5, 80],
        [6, 90],
        [7, 40]
    ]);

    var options = {
        title: 'Quiz Scores (Hard)',
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

    var chart = new google.visualization.LineChart(document.getElementById('chart-hard'));
    //chart.draw(data, google.charts.Line.convertOptions(options));
    chart.draw(data, options);
};

