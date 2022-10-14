
if (!Highcharts.theme) {
    Highcharts.setOptions({
        chart: {
            backgroundColor: 'none'
        },
        title: {
            style: {
                color: 'black'
            }
        },
        tooltip: {
            style: {
                color: 'black'
            }
        }
    });
}
function changehead(){
	 document.getElementById("home").src = "pic/haunghead.png";
	 document.getElementById("box11").style.left="1380px";
	 document.getElementById("box11").style.top="5px";
}
function changehome(){
	 document.getElementById("home").src = "pic/homepage.png";
	 document.getElementById("box11").style.left="1450px";
	 document.getElementById("box11").style.top="0px";
}
function startTime() {
    var today = new Date();
    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();
    mm = checkTime(mm);
    ss = checkTime(ss);
    document.getElementById('clock').innerHTML = hh + ":" + mm + ":" + ss;
    var timeoutId = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function progress() {
    var Area = $("#SelectArea").val();
    $.ajax({
        url: "csv.php",
        data: {
            Area: Area
        },
        type: "POST",
        datatype: "html",
        success: function (output) {
            $("#out").html(output);
        },
        error: function () {
            alert("Request failed.");
        }
    });
}

function displaygooglemap(lngval, latval) {
    document.getElementById("map").style.border = "5px black double";
    document.getElementById("map").style.borderRadius = "30px";
    $("#map").animate({ opacity: '0' }, 0);
    var lngValue = parseFloat(lngval);
    var latValue = parseFloat(latval);
    var Station_latlng = { lat: latValue, lng: lngValue };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: Station_latlng
    });
    var marker = new google.maps.Marker({
        position: Station_latlng,
        map: map
    });
    $("#map").animate({ opacity: '1' }, 1500);
}

function display(Record) {
    $.ajax({
        url: "display.php",
        data: {
            Record: Record
        },
        type: "POST",
        datatype: "html",
        success: function (output) {
            var show = document.getElementById("box12");
            var googlemapbutton = document.getElementById("box14");
            var temp = output.split(',');
            var all = temp[0];
            var ava = temp[1];
            var emp = temp[2];
            var are = temp[3];
            var nam = temp[4];
            var lng = temp[5];
            var lat = temp[6];
            $("#box12").animate({ opacity: '0' }, 0);
            show.innerHTML = "<p><b>" + are + "   " + nam + "</b></p>";
            $("#box12").animate({ opacity: '1' }, 1500);
			$("#box15").animate({ opacity: '1' }, 1500);
            Highcharts.chart('container', {

                chart: {
                    type: 'solidgauge',
                    height: '110%',
                },

                title: {
                    text: '車輛狀態顯示',
                    style: {
                        fontSize: '30px',
                        fontWeight: '900',
                    }
                },

                tooltip: {
                    borderWidth: 0,
                    backgroundColor: 'none',
                    shadow: false,
                    style: {
                        fontSize: '16px',
                    },
                    valueSuffix: '輛',
                    pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
                    positioner: function (labelWidth) {
                        return {
                            x: (this.chart.chartWidth - labelWidth) / 2,
                            y: (this.chart.plotHeight / 2) + 15
                        };
                    }
                },

                pane: {
                    startAngle: 0,
                    endAngle: 360,
                    background: [{ // Track for Move
                        outerRadius: '112%',
                        innerRadius: '88%',
                        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0
                    }, { // Track for Exercise
                        outerRadius: '87%',
                        innerRadius: '63%',
                        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0
                    }, { // Track for Stand
                        outerRadius: '62%',
                        innerRadius: '38%',
                        backgroundColor: 'rgba(255,160,4,0.3)',
                        borderWidth: 0
                    }]
                },

                yAxis: {
                    min: 0,
                    max: all,
                    lineWidth: 0,
                    tickPositions: []
                },

                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            enabled: false
                        },
                        linecap: 'round',
                        stickyTracking: false,
                        rounded: true
                    }
                },

                series: [{
                    name: '<b>總停車格</b>',
                    data: [{
                        color: Highcharts.getOptions().colors[0],
                        radius: '112%',
                        innerRadius: '88%',
                        y: parseInt(all)
                    }]
                }, {
                    name: '<b>可借車數</b>',
                    data: [{
                        color: Highcharts.getOptions().colors[2],
                        radius: '87%',
                        innerRadius: '63%',
                        y: parseInt(ava)
                    }]
                }, {
                    name: '<b>可還車數</b>',
                    data: [{
                        color: '#FFA042',
                        radius: '62%',
                        innerRadius: '38%',
                        y: parseInt(emp)
                    }]
                }]
            });
        },
        error: function () {
            alert("Request failed.");
        }
    });
}