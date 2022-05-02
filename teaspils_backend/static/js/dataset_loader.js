//Loading the window create the switch control and setting it to realtime
window.onload = function () {
    document.getElementById('load_switch').addEventListener('change', function (event) {
        if (event.currentTarget.checked) {
            $('#dataset-upload').prop("disabled", true);
            $('#dataset-upload').val(null);
            load_from_realtime();
        } else {
            $('#dataset-upload').prop("disabled", false);
        }
    });

    console.log(document.getElementById('load_switch').checked);
    document.getElementById('load_switch').checked = true;
    load_from_realtime();

    $(document).ready(function () {
        function fade_out() {
            $(".alert").fadeOut().empty();
        }
        setTimeout(fade_out, 5000);
    });
};


// Setting an event to load data from a file
document.getElementById('dataset-upload').addEventListener('change', function (event) {

    files = event.target.files;

    // Allowing file type
    var allowedExtensions = /(\.csv|\.CSV)$/i;

    if (!allowedExtensions.exec(files[0].name)) {
        alert('Invalid file type');
    } else {
        var reader = new FileReader()
        reader.onload = function (e) {
            csv_data = e.target.result;
            json_data = csvJSON(csv_data);
            console.log(json_data);

            load_from_file(json_data)
        }
        reader.readAsBinaryString(files[0]);
    }
})

//Converiting CSV into JSON
//All credit to http://techslides.com/convert-csv-to-json-in-javascript
//var csv is the CSV file with headers
function csvJSON(csv) {

    var lines = csv.split("\n");

    var result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers = lines[0].split(";");

    console.log(headers);

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(";");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j].trim().replace(/(\r\n|\n|\r)/gm, "")] = currentline[j].trim().replace(/(\r\n|\n|\r)/gm, "");
        }

        result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

//Display plots using FILE data
function load_from_file(json_loaded) {

    let history = JSON.parse(json_loaded);

    console.log(history);

    var times = [];
    var temps = [];
    var soilHumidity = [];
    var co2s = [];
    var lights = [];
    var hums = [];


    for (let i = 0; i < history.length; i++) {
        times.push(new Date(history[i]['Timestamp']));
        temps.push(history[i]['temperature']);
        soilHumidity.push(history[i]['soilHumidity']);
        co2s.push(history[i]['co2']);
        lights.push(history[i]['light']);
        hums.push(history[i]['humidity']);
    }
    console.log("TEMPERATURAS::::::");
    console.log(times, temps);



    let trace_temp = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Timestamp: ',
        x: times,
        y: temps,
        text: temps.map(function (value) { return `Temperature: ${value} Cº`; }),
        line: { color: '#f1bdff', width: 3 },
        marker: { color: '#d9bdff', size: 5 },
    }

    let trace_soilHumidity = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Soil Humidity (%)',
        x: times,
        y: soilHumidity,
        text: soilHumidity.map(function (value) { return `Soil H.: ${value} %`; }),
        hoverinfo: 'text',
        line: { color: '#666666', width: 3 },
        marker: { color: '#666666', size: 5 },
        layout: {
            xaxis: {
                tickformat: "%H/%M"
            }
        }
    }

    let trace_co2 = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Co2 (ppm)',
        x: times,
        y: co2s,
        text: co2s.map(function (value) { return `Co2: ${value} ppm`; }),
        hoverinfo: 'text',
        line: { color: '#9cbcff', width: 3 },
        marker: { color: '#9cbcff', size: 5 },
    }

    let trace_light = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Light (lux)',
        x: times,
        y: lights,
        text: lights.map(function (value) { return `Light: ${value} lux`; }),
        hoverinfo: 'text',
        line: { color: '#ffa2a2', width: 3 },
        marker: { color: '#ffa2a2', size: 5 },
    }

    let trace_hum = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Humidity (%)',
        x: times,
        y: hums,
        text: hums.map(function (value) { return `Humidity: ${value} %`; }),
        hoverinfo: 'text',
        line: { color: '#bdfff1', width: 3 },
        marker: { color: '#bdfff1', size: 5 },
    }

    plot_all_div = document.getElementById('plt_loaded'); //plt_all
    Plotly.newPlot(plt_all, [trace_temp, trace_soilHumidity, trace_co2, trace_light, trace_hum], {
        margin: { t: 15 },
        // plot_bgcolor: "#ffde9f",
        // paper_bgcolor: "#ffde9f",
        legend: {
            yanchor: "top",
            y: 0.8,
            xanchor: "right",
            x: 1.1
        },
        hovermode: "x unified",
        hovertemplate: "{x}",
        xaxis: {
            tickformat: '%Y-%m-%d',
        },
        autosize: true,
    }, { responsive: true });

    let m1 = 'Temperature'
    let m2 = 'Soil Humidity'

    $('#first-options a').on('click', function () {
        m1 = $(this).text();
        console.log("comparing " + m1 + " - " + m2);
        compare_measures(m1, m2);
    });

    $('#second-options a').on('click', function () {
        m2 = $(this).text();
        console.log("comparing " + m1 + " - " + m2);
        compare_measures(m1, m2);
    });

    function compare_measures(m1, m2) {
        let traces_dict = {
            'Temperature': trace_temp,
            'Temperatura': trace_temp,
            'Soil Humidity': trace_soilHumidity,
            'Humedad del suelo': trace_soilHumidity,
            'Humitat del sòl': trace_soilHumidity,
            'Co2': trace_co2,
            'Light': trace_light,
            'Iluminación': trace_light,
            'Il·luminació': trace_light,
            'Humidity': trace_hum,
            'Humedad': trace_hum,
            'Humitat': trace_hum
        }

        console.log("1: " + traces_dict[m1]);
        console.log("2: " + traces_dict[m2]);
        plot_compare_div = document.getElementById('plt_compare');
        Plotly.newPlot(plot_compare_div, [traces_dict[m1], traces_dict[m2]], {
            margin: { t: 15 },
            // plot_bgcolor: "#ffde9f",
            // paper_bgcolor: "#ffde9f",
            legend: {
                yanchor: "top",
                y: 0.8,
                xanchor: "right",
                x: 1.1
            },
            hovermode: "x unified",
            xaxis: {
                tickformat: '%H:%M',
            },
            autosize: true,
        }, { responsive: true });
    }

    compare_measures(m1, m2);

    plt_all.on('plotly_click', function (data) {

        console.log(data.points);

        let hum_y = 0.0;
        let light_y = 0.0;
        let co2_y = 0.0;
        let soilH_y = 0.0;
        let temp_y = 0.0;

        if (typeof (data['points'][0]) != "undefined") {
            hum_y = data['points'][0]['y'];
        }
        if (typeof (data['points'][1]) != "undefined") {
            light_y = data['points'][1]['y'];
        }
        if (typeof (data['points'][2]) != "undefined") {
            co2_y = data['points'][2]['y'];
        }
        if (typeof (data['points'][3]) != "undefined") {
            soilH_y = data['points'][3]['y'];
        }
        if (typeof (data['points'][4]) != "undefined") {
            temp_y = data['points'][4]['y'];
        }

        single_measure = {
            'timestamp': data['points'][0]['x'],
            'humidity': hum_y,
            'light': light_y,
            'co2': co2_y,
            'soilHumidity': soilH_y,
            'temperature': temp_y
        };

        sm_json = JSON.stringify(single_measure)
        location.href = "/teaspils/plant/" + pid + "/measures/" + sm_json;
    });

}

// data from thingsboard server
function load_from_realtime() {

    var times = []
    var temps = []
    var soilHumidity = []
    var co2s = []
    var lights = []
    var hums = []


    for (let i = 0; i < history.length; i++) {
        times.push(new Date(history[i]['Timestamp']));
        temps.push(history[i]['temperature']);
        soilHumidity.push(history[i]['soilHumidity']);
        co2s.push(history[i]['co2']);
        lights.push(history[i]['light']);
        hums.push(history[i]['humidity']);
    }
    console.log("From server: ")
    console.log(times, temps, soilHumidity, co2s, lights, hums);

    let trace_temp = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Temperatura (ºC)',
        x: times,
        y: temps,
        text: temps.map(function (value) { return `${value} Cº`; }),
        hoverinfo: 'text',
        line: { color: '#f1bdff', width: 3 },
        marker: { color: '#d9bdff', size: 5 },
        layout: {
            xaxis: {
                tickformat: "%Y-%m-%d"
            },
        }
    }

    let trace_soilHumidity = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Humitat del sòl (%)',
        x: times,
        y: soilHumidity,
        text: soilHumidity.map(function (value) { return `Soil H.: ${value} %`; }),
        hoverinfo: 'text',
        line: { color: '#666666', width: 3 },
        marker: { color: '#666666', size: 5 },
        layout: {
            xaxis: {
                tickformat: "%H/%M"
            },
        }
    }

    let trace_co2 = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Co2 (ppm)',
        x: times,
        y: co2s,
        text: co2s.map(function (value) { return `Co2: ${value} ppm`; }),
        hoverinfo: 'text',
        line: { color: '#9cbcff', width: 3 },
        marker: { color: '#9cbcff', size: 5 },
        layout: {
            xaxis: {
                tickformat: "%Y-%m-%d"
            },
        }
    }

    let trace_light = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Il·luminació (lux)',
        x: times,
        y: lights,
        text: lights.map(function (value) { return `Light: ${value} lux`; }),
        hoverinfo: 'text',
        line: { color: '#ffa2a2', width: 3 },
        marker: { color: '#ffa2a2', size: 5 },
        layout: {
            xaxis: {
                tickformat: "%Y-%m-%d"
            },
        }
    }

    let trace_hum = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Humitat (%)',
        x: times,
        y: hums,
        text: hums.map(function (value) { return `Humidity: ${value} %`; }),
        hoverinfo: 'text',
        line: { color: '#bdfff1', width: 3 },
        marker: { color: '#bdfff1', size: 5 },
        layout: {
            xaxis: {
                tickformat: "%Y-%m-%d"
            },
        }
    }

    plot_all_div = document.getElementById('plt_all'); //plt_all
    Plotly.newPlot(plt_all, [trace_temp, trace_soilHumidity, trace_co2, trace_light, trace_hum], {
        margin: { t: 15 },
        // plot_bgcolor: "#ffde9f",
        // paper_bgcolor: "#ffde9f",
        legend: {
            yanchor: "top",
            y: 0.8,
            xanchor: "right",
            x: 1.1
        },
        hovermode: "x unified",
        hovertemplate: "{x}",
        xaxis: {
            tickformat: '%Y-%m-%d',
        },
        autosize: true,
    }, { responsive: true });

    let m1 = 'Temperature'
    let m2 = 'Soil Humidity'

    $('#first-options a').on('click', function () {
        m1 = $(this).text();
        console.log("comparing " + m1 + " - " + m2);
        compare_measures(m1, m2);
    });

    $('#second-options a').on('click', function () {
        m2 = $(this).text();
        console.log("comparing " + m1 + " - " + m2);
        compare_measures(m1, m2);
    });

    function compare_measures(m1, m2) {
        let traces_dict = {
            'Temperature': trace_temp,
            'Temperatura': trace_temp,
            'Soil Humidity': trace_soilHumidity,
            'Humedad del suelo': trace_soilHumidity,
            'Humitat del sòl': trace_soilHumidity,
            'Co2': trace_co2,
            'Light': trace_light,
            'Iluminación': trace_light,
            'Il·luminació': trace_light,
            'Humidity': trace_hum,
            'Humedad': trace_hum,
            'Humitat': trace_hum
        }

        console.log("1: " + traces_dict[m1]);
        console.log("2: " + traces_dict[m2]);
        plot_compare_div = document.getElementById('plt_compare');
        Plotly.newPlot(plot_compare_div, [traces_dict[m1], traces_dict[m2]], {
            margin: { t: 15 },
            // plot_bgcolor: "#ffde9f",
            // paper_bgcolor: "#ffde9f",
            legend: {
                yanchor: "top",
                y: 0.8,
                xanchor: "right",
                x: 1.1
            },
            hovermode: "x unified",
            xaxis: {
                tickformat: '%H:%M',
            },
            autosize: true,
        }, { responsive: true });
    }

    compare_measures(m1, m2);

    plt_all.on('plotly_click', function (data) {

        console.log(data.points);

        let hum_y = 0.0;
        let light_y = 0.0;
        let co2_y = 0.0;
        let soilH_y = 0.0;
        let temp_y = 0.0;

        if (typeof (data['points'][0]) != "undefined") {
            hum_y = data['points'][0]['y'];
        }
        if (typeof (data['points'][1]) != "undefined") {
            light_y = data['points'][1]['y'];
        }
        if (typeof (data['points'][2]) != "undefined") {
            co2_y = data['points'][2]['y'];
        }
        if (typeof (data['points'][3]) != "undefined") {
            soilH_y = data['points'][3]['y'];
        }
        if (typeof (data['points'][4]) != "undefined") {
            temp_y = data['points'][4]['y'];
        }

        single_measure = {
            'timestamp': data['points'][0]['x'],
            'humidity': hum_y,
            'light': light_y,
            'co2': co2_y,
            'soilHumidity': soilH_y,
            'temperature': temp_y
        };

        sm_json = JSON.stringify(single_measure)
        location.href = "/teaspils/plant/" + pid + "/measures/" + sm_json;
    });

}