/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", () => {

    /*The value of the IdPlant is defined*/
    let IdPlant = 1;
    let id_plant_displayer = document.getElementById('id_disp')
    id_plant_displayer.value = IdPlant;

    /*INITIALIZE THE LIMITS FOR TEMPERATURE*/
    let lower_limit_T = document.getElementById("myInputLowT").value;
    let upper_limit_T = document.getElementById("myInputHighT").value;

    /*INITIALIZE THE LIMITS FOR SOIL TEMPERATURE*/
    let lower_limit_SoilT = document.getElementById("myInputLowSoilT").value;
    let upper_limit_SoilT = document.getElementById("myInputHighSoilT").value;
    
    /*INITIALIZE THE LIMITS FOR SOIL HUMIDITY*/
    let lower_limit_SoilH = document.getElementById("myInputLowSoilH").value;
    let upper_limit_SoilH = document.getElementById("myInputHighSoilH").value;

    // /*INITIALIZE THE LIMITS FOR THE NOISE*/
    // let lower_limit_Noise = document.getElementById("myInputLowNoise").value;
    // let upper_limit_Noise = document.getElementById("myInputHighNoise").value;

    /*INITIALIZE THE LIMITS FOR THE CO2*/
    let lower_limit_CO2 = document.getElementById("myInputLowCO2").value;
    let upper_limit_CO2 = document.getElementById("myInputHighCO2").value;

    /*INITIALIZE THE LIMITS FOR THE HUMIDITY*/
    let lower_limit_HUM = document.getElementById("myInputLowHUM").value;
    let upper_limit_HUM = document.getElementById("myInputHighHUM").value;

    /*INITIALIZE THE LIMITS FOR THE ILLUMINCANCE*/
    let lower_limit_IL = document.getElementById("myInputLowIL").value;;
    let upper_limit_IL = document.getElementById("myInputHighIL").value;

    let hidden_data = document.getElementById("hidden_data").value
    hidden_data = hidden_data.replaceAll("\'", "\"");
    let measure_data = JSON.parse(hidden_data);
    console.log(measure_data);

    loadDashboard(measure_data, lower_limit_T, upper_limit_T, 
                                lower_limit_SoilT, upper_limit_SoilT,
                                lower_limit_SoilH, upper_limit_SoilH,
                                // lower_limit_Noise, upper_limit_Noise, 
                                lower_limit_CO2, upper_limit_CO2, 
                                lower_limit_HUM, upper_limit_HUM, 
                                lower_limit_IL, upper_limit_IL
                );


    /*********************INPUT SETTINGS*************************************/
    /******************************TEMPERATURE*************************************/
    let input_button_T = document.getElementById('inputButtonT')
    input_button_T.addEventListener('click', function () {
        /*LOW LIMIT OF TEMPERATURE*/
        let input_value_low = document.getElementById('myInputLowT').value
        let input_value_high = document.getElementById('myInputHighT').value

        document.getElementById("label_temp_h").innerHTML = parseInt(input_value_high);
        document.getElementById("label_temp_m").innerHTML = ((parseInt(input_value_high) + parseInt(input_value_low)) / 2);
        document.getElementById("label_temp_l").innerHTML = parseInt(input_value_low);

        loadDashboard(measure_data, input_value_low, input_value_high, 
                                    lower_limit_SoilT, upper_limit_SoilT,
                                    lower_limit_SoilH, upper_limit_SoilH,
                                    // lower_limit_Noise, upper_limit_Noise, 
                                    lower_limit_CO2, upper_limit_CO2, 
                                    lower_limit_HUM, upper_limit_HUM, 
                                    lower_limit_IL, upper_limit_IL);
    })

    /*******************************SOILT*************************************/

    let input_button_SoilT = document.getElementById('inputButtonSoilT')
    input_button_SoilT.addEventListener('click', function () {

        let input_value_low = document.getElementById("myInputLowSoilT").value;
        let input_value_high = document.getElementById("myInputHighSoilT").value;
        
        document.getElementById("label_SoilT_h").innerHTML = parseInt(input_value_high);
        document.getElementById("label_SoilT_m").innerHTML = ((parseInt(input_value_high) + parseInt(input_value_low)) / 2);
        document.getElementById("label_SoilT_l").innerHTML = parseInt(input_value_low);

        loadDashboard(measure_data, lower_limit_T, upper_limit_T, 
                                    input_value_low, input_value_high, 
                                    lower_limit_SoilH, upper_limit_SoilH,
                                    // lower_limit_Noise, upper_limit_Noise,
                                    lower_limit_CO2, upper_limit_CO2, 
                                    lower_limit_HUM, upper_limit_HUM, 
                                    lower_limit_IL, upper_limit_IL);
    })

        /*******************************SOILH*************************************/

        let input_button_SoilH = document.getElementById('inputButtonSoilH')
        input_button_SoilH.addEventListener('click', function () {
    
            let input_value_low = document.getElementById("myInputLowSoilH").value;
            let input_value_high = document.getElementById("myInputHighSoilH").value;
            
            document.getElementById("label_SoilH_h").innerHTML = parseInt(input_value_high);
            document.getElementById("label_SoilH_m").innerHTML = ((parseInt(input_value_high) + parseInt(input_value_low)) / 2);
            document.getElementById("label_SoilH_l").innerHTML = parseInt(input_value_low);
    
            loadDashboard(measure_data, lower_limit_T, upper_limit_T, 
                                        lower_limit_SoilT, upper_limit_SoilT,
                                        input_value_low, input_value_high, 
                                        // lower_limit_Noise, upper_limit_Noise,
                                        lower_limit_CO2, upper_limit_CO2, 
                                        lower_limit_HUM, upper_limit_HUM, 
                                        lower_limit_IL, upper_limit_IL);
        })

    /*******************************NOISE*************************************/

    // let input_button_Noise = document.getElementById('inputButtonNoise')
    // input_button_Noise.addEventListener('click', function () {

    //     let input_value_low = document.getElementById("myInputLowNoise").value;
    //     let input_value_high = document.getElementById("myInputHighNoise").value;
        
    //     document.getElementById("label_noise_h").innerHTML = parseInt(input_value_high);
    //     document.getElementById("label_noise_m").innerHTML = ((parseInt(input_value_high) + parseInt(input_value_low)) / 2);
    //     document.getElementById("label_noise_l").innerHTML = parseInt(input_value_low);

    //     loadDashboard(measure_data, lower_limit_T, upper_limit_T, 
    //                                 lower_limit_SoilT, upper_limit_SoilT,
    //                                 lower_limit_SoilH, upper_limit_SoilH,
    //                                 input_value_low, input_value_high, 
    //                                 lower_limit_CO2, upper_limit_CO2, 
    //                                 lower_limit_HUM, upper_limit_HUM, 
    //                                 lower_limit_IL, upper_limit_IL);
    // })

    /*******************************CO2*************************************/
    let input_button_CO2 = document.getElementById('inputButtonCO2');
    input_button_CO2.addEventListener('click', function () {
        let input_value_low = document.getElementById('myInputLowCO2').value;
        let input_value_high = document.getElementById('myInputHighCO2').value;

        document.getElementById("label_co2_h").innerHTML = parseInt(input_value_high);
        document.getElementById("label_co2_m").innerHTML = ((parseInt(input_value_high) + parseInt(input_value_low)) / 2);
        document.getElementById("label_co2_l").innerHTML = parseInt(input_value_low);

        loadDashboard(measure_data, lower_limit_T, upper_limit_T, 
                                    lower_limit_SoilT, upper_limit_SoilT,
                                    lower_limit_SoilH, upper_limit_SoilH,
                                    lower_limit_Noise, upper_limit_Noise, 
                                    input_value_low, input_value_high, 
                                    lower_limit_HUM, upper_limit_HUM, 
                                    lower_limit_IL, upper_limit_IL);
    })

    /*******************************HUMIDITY*************************************/
    let input_button_HUM = document.getElementById('inputButtonHUM')
    input_button_HUM.addEventListener('click', function () {
        let input_value_low = document.getElementById('myInputLowHUM').value;
        let input_value_high = document.getElementById("myInputHighHUM").value;

        document.getElementById("label_hum_h").innerHTML = parseInt(input_value_high);
        document.getElementById("label_hum_m").innerHTML = ((parseInt(input_value_high) + parseInt(input_value_low)) / 2);
        document.getElementById("label_hum_l").innerHTML = parseInt(input_value_low);

        loadDashboard(measure_data, lower_limit_T, upper_limit_T, 
                                    lower_limit_SoilT, upper_limit_SoilT,
                                    lower_limit_SoilH, upper_limit_SoilH,
                                    // lower_limit_Noise, upper_limit_Noise, 
                                    lower_limit_CO2, upper_limit_CO2, 
                                    input_value_low, input_value_high, 
                                    lower_limit_IL, upper_limit_IL);
    })

    /*******************************ILLUMINANCE*************************************/
    let input_button_IL = document.getElementById('inputButtonIL')
    input_button_IL.addEventListener('click', function () {
        let input_value_low = document.getElementById('myInputLowIL').value
        let input_value_high = document.getElementById('myInputHighIL').value

        document.getElementById("label_light_h").innerHTML = parseInt(input_value_high);
        document.getElementById("label_light_m").innerHTML = ((parseInt(input_value_high) + parseInt(input_value_low)) / 2);
        document.getElementById("label_light_l").innerHTML = parseInt(input_value_low);

        loadDashboard(measure_data, lower_limit_T, upper_limit_T, 
                                    lower_limit_SoilT, upper_limit_SoilT,
                                    lower_limit_SoilH, upper_limit_SoilH,
                                    // lower_limit_Noise, upper_limit_Noise, 
                                    lower_limit_CO2, upper_limit_CO2, 
                                    lower_limit_HUM, upper_limit_HUM, 
                                    input_value_low, input_value_high);
    })

});

const red = '#FF3104';
const green = '#4AD347';
const orange = '#E8B147';

function loadDashboard(measure_data, lower_limit_T, upper_limit_T, 
                                     lower_limit_SoilT, upper_limit_SoilT,
                                     lower_limit_SoilH, upper_limit_SoilH,
                                    //  lower_limit_Noise, upper_limit_Noise, 
                                     lower_limit_CO2, upper_limit_CO2, 
                                     lower_limit_HUM, upper_limit_HUM, 
                                     lower_limit_IL, upper_limit_IL) {

    let Date_place = document.getElementById("date");

    let myH2 = document.createElement('h3');

    myH2.textContent = measure_data['timestamp'].Value;
    Date_place.textContent = myH2.textContent;
    /*appendChild(myH2);*/

    ///$$$$$$$
    /*____________________________________TEMPERATURE_________________________________*/
    let Temperature = document.getElementById("T-load");
    /*Checking if the temperature data has been received*/

    if (measure_data['temperature'] != null) {

        let valueT = parseFloat(measure_data['temperature']);
        let percentage = 0.0;
        if (valueT < lower_limit_T) {
            percentage = 20.0;
        } else if (valueT >= lower_limit_T && valueT <= upper_limit_T) {
            a = 25;
            b = 75;
            min = parseFloat(lower_limit_T);
            max = parseFloat(upper_limit_T);
            
            percentage = ((b-a)*(valueT-min)/(max-min)) + a;
        } else {
            percentage = 90.0;
        }

        Temperature.style.height = percentage.toString() + '%';
        Temperature.setAttribute('title', measure_data['temperature']);
        let color_T
        if (valueT > lower_limit_T && valueT < upper_limit_T) {
            color_T = green;
        } else if (valueT == upper_limit_T || valueT == lower_limit_T) {
            color_T = orange;
        } else {
            color_T = red;
        }
        Temperature.style.backgroundColor = color_T;
    }
    else {
        let Temp_input = document.getElementById("temp-input")
        Temp_input.style.color = '#808080'
        color_T = red
        Temperature.style.height = '100%';
        Temperature.style.backgroundColor = '#F0F8FF'
    }

        /*____________________________________SOIL TEMPERATURE_________________________________*/
        let SoilTemperature = document.getElementById("SoilT-load");
        /*Checking if the temperature data has been received*/
    
        if (measure_data['soilTemperature'] != null) {
    
            let valueST = parseFloat(measure_data['soilTemperature']);
            let percentage = 0.0;
            if (valueST < lower_limit_SoilT) {
                percentage = 20.0;
            } else if (valueST >= lower_limit_SoilT && valueST <= upper_limit_SoilT) {
                a = 25;
                b = 75;
                min = parseFloat(lower_limit_SoilT);
                max = parseFloat(upper_limit_SoilT);
                
                percentage = ((b-a)*(valueST-min)/(max-min)) + a;
            } else {
                percentage = 90.0;
            }
    
            SoilTemperature.style.height = percentage.toString() + '%';
            SoilTemperature.setAttribute('title', measure_data['soilTemperature']);
            let color_ST
            if (valueST > lower_limit_SoilT && valueST < upper_limit_SoilT) {
                color_ST = green;
            } else if (valueST == upper_limit_SoilT || valueST == lower_limit_SoilT) {
                color_ST = orange;
            } else {
                color_ST = red;
            }
            SoilTemperature.style.backgroundColor = color_ST;
        }
        else {
            let SoilTemp_input = document.getElementById("soilT-input")
            SoilTemp_input.style.color = '#808080'
            color_ST = red
            SoilTemperature.style.height = '100%';
            SoilTemperature.style.backgroundColor = '#F0F8FF'
        }

    /*____________________________________SOIL HUM_________________________________*/
    let SoilHum = document.getElementById("SoilH-load");

    if (measure_data['soilHumidity'] != null) {

        let valueSH = parseFloat(measure_data['soilHumidity']);
        let percentage = 0.0;
        if (valueSH < lower_limit_SoilH) {
            percentage = 20.0;
        } else if (valueSH >= lower_limit_SoilH && valueSH <= upper_limit_SoilH) {
            a = 25;
            b = 75;
            min = parseFloat(lower_limit_SoilH);
            max = parseFloat(upper_limit_SoilH);
            
            percentage = ((b-a)*(valueSH-min)/(max-min)) + a;
        } else {
            percentage = 90.0;
        }

        SoilHum.style.height = percentage.toString() + '%';
        SoilHum.setAttribute('title', measure_data['soilHumidity']);
        let color_SH;
        if (valueSH > lower_limit_SoilH && valueSH < upper_limit_SoilH) {
            color_SH = green;
        } else if (valueSH == upper_limit_SoilH || valueSH == lower_limit_SoilH) {
            color_SH = orange;
        } else {
            color_SH = red;
        }
        SoilHum.style.backgroundColor = color_SH;
    }
    else {
        let SoilHum_input = document.getElementById("soilH-input")
        SoilHum_input.style.color = '#808080'
        SoilH.style.height = '100%';
        color_SH = red
        SoilH.style.backgroundColor = '#F0F8FF'
    }

    /*____________________________________CO2_________________________________*/
    var CO2 = document.getElementById("CO2-load");
    if (measure_data['co2'] != null) {

        let valueC = parseFloat(measure_data['co2']);
        let percentage = 0.0;
        if (valueC < lower_limit_CO2) {
            percentage = 20.0;
        } else if (valueC >= lower_limit_CO2 && valueC <= upper_limit_CO2) {
            a = 25;
            b = 75;
            min = parseFloat(lower_limit_CO2);
            max = parseFloat(upper_limit_CO2);
            
            percentage = ((b-a)*(valueC-min)/(max-min)) + a;
        } else {
            percentage = 90.0;
        }

        CO2.style.height = percentage.toString() + '%';
        CO2.setAttribute('title', measure_data['co2']);
        let color_C;
        if (valueC > lower_limit_CO2 && valueC < upper_limit_CO2) {
            color_C = green;
        } else if (valueC == upper_limit_CO2 || valueC == lower_limit_CO2) {
            color_C = orange;
        } else {
            color_C = red;
        }
        CO2.style.backgroundColor = color_C;
    }
    else {
        let CO2_input = document.getElementById("co2-input")
        CO2_input.style.color = '#808080'
        CO2.style.height = '100%';
        CO2.style.backgroundColor = '#F0F8FF'
    }

    /*____________________________________HUMIDITY_________________________________*/
    var Hum = document.getElementById("H-load");
    if (measure_data['humidity'] != null) {

        let valueH = parseFloat(measure_data['humidity']);
        let percentage = 0.0;
        if (valueH < lower_limit_HUM) {
            percentage = 20.0;
        } else if (valueH >= lower_limit_HUM && valueH <= upper_limit_HUM) {
            a = 25;
            b = 75;
            min = parseFloat(lower_limit_HUM);
            max = parseFloat(upper_limit_HUM);
            
            percentage = ((b-a)*(valueH-min)/(max-min)) + a;
        } else {
            percentage = 90.0;
        }

        Hum.style.height = percentage.toString() + '%';
        Hum.setAttribute('title', measure_data['humidity']);
        let color_H;
        if (valueH > lower_limit_HUM && valueH < upper_limit_HUM) {
            color_H = green;
        } else if (valueH == upper_limit_HUM || valueH == lower_limit_HUM) {
            color_H = orange;
        } else {
            color_H = red;
        }
        Hum.style.backgroundColor = color_H;
    }
    else {
        let Hum_input = document.getElementById("humidity-input")
        Hum_input.style.color = '#808080'
        Hum.style.height = '100%';
        Hum.style.backgroundColor = '#F0F8FF'
    }

    /*____________________________________ILLUMINANCE_________________________________*/
    var Light = document.getElementById("L-load");
    if (measure_data['light'] != null) {

        let valueL = parseFloat(measure_data['light']);
        let percentage = 0.0;
        if (valueL < lower_limit_IL) {
            percentage = 20.0;
        } else if (valueL >= lower_limit_IL && valueL <= upper_limit_IL) {
            a = 25;
            b = 75;
            min = parseFloat(lower_limit_IL);
            max = parseFloat(upper_limit_IL);
            
            percentage = ((b-a)*(valueL-min)/(max-min)) + a;
        } else {
            percentage = 90.0;
        }

        Light.style.height = percentage.toString() + '%';
        Light.setAttribute('title', measure_data['light']);
        let color_L;
        if (valueL > lower_limit_IL && valueL < upper_limit_IL) {
            color_L = green;
        } else if (valueL == upper_limit_IL || valueL == lower_limit_IL) {
            color_L = orange;
        } else {
            color_L = red;
        }
        Light.style.backgroundColor = color_L;
    }
    else {
        let Light_input = document.getElementById("light-input")
        Light_input.style.color = '#808080'
        Light.style.height = '100%';
        Light.style.backgroundColor = '#F0F8FF'
    }
}