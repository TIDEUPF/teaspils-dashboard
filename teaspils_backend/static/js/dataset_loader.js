//Loading the window create the switch control and setting it to realtime
window.onload = function () {
    $('#dataset-upload').prop("disabled", false);
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });


    if (window.localStorage.getItem("dataset") === null) {
        load_from_file({});
    }else {
        json_data = csvJSON(window.localStorage.getItem("dataset"));
        load_from_file(json_data)  
    }
};


// Setting an event to load data from a file
document.getElementById('dataset-upload').addEventListener('change', function (event) {
    console.log("LOADING DATASET");
    files = event.target.files;

    // Allowing file type
    var allowedExtensions = /(\.csv|\.CSV)$/i;

    if (!allowedExtensions.exec(files[0].name)) {
        alert('Invalid file type');
    } else {
        var reader = new FileReader()
        reader.onload = function (e) {
            csv_data = e.target.result;
            window.localStorage.setItem('dataset', csv_data);

            json_data = csvJSON(csv_data);
            load_from_file(json_data)

            // If success save the file as the last used in database
            let formData = new FormData();
            formData.append('file', csv_data);
            formData.append('name', 'dataset_upload');

            fetch("/teaspils/plant/"+pid+"/history",{
                method: "POST",
                body: formData
            })  
            .then((response) => { console.log("SUCCESS",response)})
            .catch(() => { console.log("ERROR")})

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

    //console.log(headers);

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
function load_from_file(json_loaded){

    let history = JSON.parse(json_loaded);

    //console.log(history);

    var times = [];
    var temps = [];
    var soilTemperatures1 = [];
    var soilTemperatures2 = [];
    var co2s = [];
    var lights = [];
    var humidities = [];


    for (let i = 0; i < history.length; i++) {
        times.push(new Date(history[i]['timestamp']));
        temps.push(history[i]['temperature']);
        soilTemperatures1.push(history[i]['soiltemperature1']);
        soilTemperatures2.push(history[i]['soiltemperature2']);
        co2s.push(history[i]['co2']);
        lights.push(history[i]['light']);
        humidities.push(history[i]['humidity']);
    }

    let trace_temp = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Temperature',
        x: times,
        y: temps,
        text: temps.map(function (value) { return `Temperature: ${value} Cº`; }),
        line: { color: '#f1bdff', width: 3 },
        marker: { color: '#d9bdff', size: 5 },
    }

    let trace_soilTemp1 = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Soil Temperature 1 Cº',
        x: times,
        y: soilTemperatures1,
        text: soilTemperatures1.map(function (value) { return ` Soil T1: ${value} Cº`; }),
        hoverinfo: 'text',
        line: { color: '#2222ff', width: 3 },
        marker: { color: '#2222ff', size: 5 },
        layout: {
            xaxis: {
                tickformat: '%d-%m-%y %H:%M',
            },
        }
    }


    let trace_soilTemp2 = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Soil Temperature 2 Cº',
        x: times,
        y: soilTemperatures2,
        text: soilTemperatures2.map(function (value) { return `Soil T2: ${value} Cº`; }),
        hoverinfo: 'text',
        line: { color: '#666666', width: 3 },
        marker: { color: '#666666', size: 5 },
        layout: {
            xaxis: {
                tickformat: '%d-%m-%y %H:%M',
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
        name: 'Humidity %',
        x: times,
        y: humidities,
        text: humidities.map(function (value) { return `Humidity: ${value} %`; }),
        hoverinfo: 'text',
        line: { color: '#bdfff1', width: 3 },
        marker: { color: '#bdfff1', size: 5 },
    }

    plot_all_div = document.getElementById('plt_all'); //plt_all
    Plotly.newPlot(plot_all_div, [trace_temp, trace_soilTemp1, trace_soilTemp2, 
                             trace_co2, trace_light, trace_hum], {
        margin: { t: 15 },
        // plot_bgcolor: "#ffde9f",
        // paper_bgcolor: "#ffde9f",
        legend: {
            yanchor: "top",
            y: 0.8,
            xanchor: "right",
            x: 1.1
        },
        hovermode: "x",
        hovertemplate: "Timestamp {x}" + 
                       "{y}",
        xaxis: {
            tickformat: '%d-%m-%y %H:%M',
            title : "Timestamp",
        },
        yaxis: {
            title: "Sensor value",
        },
        autosize: true,
    }, { responsive: true });

    let m1 = 'Soil Temperature 1'
    let m2 = 'Soil Temperature 2'

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
            'Soil Temperature 1' : trace_soilTemp1,
            'Temperatura del suelo 1' : trace_soilTemp1,
            'Soil Temperature 2': trace_soilTemp2,
            'Temperatura del suelo 2': trace_soilTemp2,
            'Co2': trace_co2,
            'Light': trace_light,
            'Iluminación': trace_light,
            'Humidity': trace_hum,
            'Humedad': trace_hum
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
                tickformat: '%d-%m-%y %H:%M',
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
        let soilT1_y = 0.0;
        let soilT2_y = 0.0;
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
            soilT2_y = data['points'][3]['y'];
        }
        if (typeof (data['points'][4]) != "undefined") {
            temp_y = data['points'][4]['y'];
        }
        if (typeof (data['points'][5]) != "undefined") {
            soilT1_y = data['points'][5]['y'];
        }

        single_measure = {
            'timestamp': data['points'][0]['x'],
            'humidity': hum_y,
            'light': light_y,
            'co2': co2_y,
            'soilTemperature2': soilT2_y,
            'soilTemperature1'   : soilT1_y,
            'temperature': temp_y
        };

        sm_json = JSON.stringify(single_measure)
        location.href = "/teaspils/plant/" + pid + "/measures/" + sm_json;
    });

}