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
    let low_limit_T = 10;
    let upper_limit_T = 30;

    /*INITIALIZE THE LIMITS FOR THE NOISE*/
    let low_limit_Noise = 25;
    let upper_limit_Noise = 75;

    /*INITIALIZE THE LIMITS FOR THE CO2*/
    let low_limit_CO2 = 500;
    let upper_limit_CO2 = 1500;

    /*INITIALIZE THE LIMITS FOR THE HUMIDITY*/
    let low_limit_HUM = 35;
    let upper_limit_HUM = 75;

    /*INITIALIZE THE LIMITS FOR THE ILLUMINCANCE*/
    let low_limit_IL = 800;
    let upper_limit_IL = 1600;
    let hidden_data = document.getElementById("hidden_data").value
    hidden_data = hidden_data.replaceAll("\'", "\"");
    let measure_data = JSON.parse(hidden_data);
    console.log(measure_data);

    loadDashboard(measure_data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise, low_limit_CO2, upper_limit_CO2, low_limit_HUM, upper_limit_HUM, low_limit_IL, upper_limit_IL);


    /*********************INPUT SETTINGS*************************************/
    /******************************TEMPERATURE*************************************/
    let T_input_lowlimit = document.getElementById('myInputLowT')
    T_input_lowlimit.value = low_limit_T;

    let T_input_highlimit = document.getElementById('myInputHighT')
    T_input_highlimit.value = upper_limit_T;

    let input_button_T = document.getElementById('inputButtonT')
    input_button_T.addEventListener('click', function () {
        /*LOW LIMIT OF TEMPERATURE*/
        console.log('Temp!')
        let input_value_low = T_input_lowlimit.value
        if (input_value_low > 80) {
            input_value_low = 80
        }
        low_limit_T = input_value_low;

        /*HIGH LIMIT OF TEMPERATURE*/
        let input_value_high = T_input_highlimit.value
        if (input_value_high > 100) {
            input_value_high = 100
        }
        upper_limit_T = input_value_high;

        document.getElementById("label_temp_h").innerHTML = parseInt(upper_limit_T);
        document.getElementById("label_temp_m").innerHTML = ((parseInt(upper_limit_T) + parseInt(low_limit_T)) / 2);
        document.getElementById("label_temp_l").innerHTML = parseInt(low_limit_T);

        loadDashboard(measure_data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise, low_limit_CO2, upper_limit_CO2, low_limit_HUM, upper_limit_HUM, low_limit_IL, upper_limit_IL);
    })

    /*******************************NOISE*************************************/

    let Noise_input_lowlimit = document.getElementById('myInputLowNoise')
    Noise_input_lowlimit.value = low_limit_Noise;

    let Noise_input_highlimit = document.getElementById('myInputHighNoise')
    Noise_input_highlimit.value = upper_limit_Noise;

    let input_button_Noise = document.getElementById('inputButtonNoise')
    input_button_Noise.addEventListener('click', function () {
        /*LOW LIMIT OF CO2*/
        console.log('Noise!')
        let input_value_low = Noise_input_lowlimit.value
        if (input_value_low > 80) {
            input_value_low = 80
        }
        low_limit_Noise = input_value_low;

        /*HIGH LIMIT OF CO2*/
        let input_value_high = Noise_input_highlimit.value
        if (input_value_high > 100) {
            input_value_high = 100
        }
        upper_limit_Noise = input_value_high;

        document.getElementById("label_noise_h").innerHTML = parseInt(upper_limit_Noise);
        document.getElementById("label_noise_m").innerHTML = ((parseInt(upper_limit_Noise) + parseInt(low_limit_Noise)) / 2);
        document.getElementById("label_noise_l").innerHTML = parseInt(low_limit_Noise);

        loadDashboard(measure_data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise, low_limit_CO2, upper_limit_CO2, low_limit_HUM, upper_limit_HUM, low_limit_IL, upper_limit_IL);
    })

    /*******************************CO2*************************************/
    let CO2_input_lowlimit = document.getElementById('myInputLowCO2')
    CO2_input_lowlimit.value = low_limit_CO2;

    let CO2_input_highlimit = document.getElementById('myInputHighCO2')
    CO2_input_highlimit.value = upper_limit_CO2;

    let input_button_CO2 = document.getElementById('inputButtonCO2')
    input_button_CO2.addEventListener('click', function () {
        /*LOW LIMIT OF CO2*/
        console.log('CO2!')
        let input_value_low = CO2_input_lowlimit.value
        if (input_value_low > 1500) {
            input_value_low = 1500
        }
        low_limit_CO2 = input_value_low;

        /*HIGH LIMIT OF CO2*/
        let input_value_high = CO2_input_highlimit.value
        if (input_value_high > 2000) {
            input_value_high = 2000
        }
        upper_limit_CO2 = input_value_high;

        document.getElementById("label_co2_h").innerHTML = parseInt(upper_limit_CO2);
        document.getElementById("label_co2_m").innerHTML = ((parseInt(upper_limit_CO2) + parseInt(low_limit_CO2)) / 2);
        document.getElementById("label_co2_l").innerHTML = parseInt(low_limit_CO2);

        loadDashboard(measure_data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise, low_limit_CO2, upper_limit_CO2, low_limit_HUM, upper_limit_HUM, low_limit_IL, upper_limit_IL);
    })

    /*******************************HUMIDITY*************************************/
    let HUM_input_lowlimit = document.getElementById('myInputLowHUM')
    HUM_input_lowlimit.value = low_limit_HUM;

    let HUM_input_highlimit = document.getElementById('myInputHighHUM')
    HUM_input_highlimit.value = upper_limit_HUM;

    let input_button_HUM = document.getElementById('inputButtonHUM')
    input_button_HUM.addEventListener('click', function () {
        /*LOW LIMIT OF HUM*/
        console.log('HUM!')
        let input_value_low = HUM_input_lowlimit.value
        if (input_value_low > 80) {
            input_value_low = 80
        }
        low_limit_HUM = input_value_low;

        /*HIGH LIMIT OF HUM*/
        let input_value_high = HUM_input_highlimit.value
        if (input_value_high > 100) {
            input_value_high = 100
        }
        upper_limit_HUM = input_value_high;

        document.getElementById("label_hum_h").innerHTML = parseInt(upper_limit_HUM);
        document.getElementById("label_hum_m").innerHTML = ((parseInt(upper_limit_HUM) + parseInt(low_limit_HUM)) / 2);
        document.getElementById("label_hum_l").innerHTML = parseInt(low_limit_HUM);

        loadDashboard(measure_data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise, low_limit_CO2, upper_limit_CO2, low_limit_HUM, upper_limit_HUM, low_limit_IL, upper_limit_IL);
    })

    /*******************************ILLUMINANCE*************************************/
    let IL_input_lowlimit = document.getElementById('myInputLowIL')
    IL_input_lowlimit.value = low_limit_IL;

    let IL_input_highlimit = document.getElementById('myInputHighIL')
    IL_input_highlimit.value = upper_limit_IL;

    let input_button_IL = document.getElementById('inputButtonIL')
    input_button_IL.addEventListener('click', function () {
        /*LOW LIMIT OF IL*/
        console.log('IL!')
        let input_value_low = IL_input_lowlimit.value
        if (input_value_low > 1000) {
            input_value_low = 1000
        }
        low_limit_IL = input_value_low;

        /*HIGH LIMIT OF HUM*/
        let input_value_high = IL_input_highlimit.value
        if (input_value_high > 100) {
            input_value_high = 100
        }
        upper_limit_IL = input_value_high;

        document.getElementById("label_light_h").innerHTML = parseInt(upper_limit_IL);
        document.getElementById("label_light_m").innerHTML = ((parseInt(upper_limit_IL) + parseInt(low_limit_IL)) / 2);
        document.getElementById("label_light_l").innerHTML = parseInt(low_limit_IL);

        loadDashboard(measure_data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise, low_limit_CO2, upper_limit_CO2, low_limit_HUM, upper_limit_HUM, low_limit_IL, upper_limit_IL);
    })

});

const red = '#FF3104';
const green = '#4AD347';
const orange = '#E8B147';

function loadDashboard(measure_data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise, low_limit_CO2, upper_limit_CO2, low_limit_HUM, upper_limit_HUM, low_limit_IL, upper_limit_IL) {

    let Date_place = document.getElementById("date");

    let myH2 = document.createElement('h3');

    myH2.textContent = measure_data['timestamp'][0].Value;
    Date_place.textContent = myH2.textContent;
    /*appendChild(myH2);*/

    /*____________________________________TEMPERATURE_________________________________*/
    let Temperature = document.getElementById("T-load");
    /*Checking if the temperature data has been received*/
    if (measure_data['temperature'] != null) {

        let valueT = Math.round((measure_data['temperature'] / upper_limit_T) * 75);
        let low_limit_T_pct = Math.round((low_limit_T / upper_limit_T) * 75);
        let high_limit_T_pct = Math.round((upper_limit_T / upper_limit_T) * 75);
        Temperature.style.height = valueT.toString() + '%';
        Temperature.setAttribute('title', measure_data['temperature']);
        let color_T
        if (valueT < low_limit_T_pct) {
            color_T = green;
        } else if (valueT < high_limit_T_pct) {
            color_T = orange;
        } else {
            color_T = red;
        }
        Temperature.style.backgroundColor = color_T;
    }
    else {
        let Temp_input = document.getElementById("temp-input")
        Temp_input.style.color = '#808080'
        console.log('hey!')
        let color_T
        color_T = red
        Temperature.style.height = '100%';
        Temperature.style.backgroundColor = '#F0F8FF'
    }

    /*____________________________________NOISE_________________________________*/
    let Noise = document.getElementById("N-load");
    let valueN = Math.round((measure_data['noise'] / upper_limit_Noise) * 75);
    Noise.style.height = valueN.toString() + '%';
    Noise.setAttribute('title', measure_data['noise']);

    let low_limit_Noise_pct = Math.round((low_limit_Noise / upper_limit_Noise) * 75);
    let high_limit_Noise_pct = Math.round((upper_limit_Noise / upper_limit_Noise) * 75);

    let color_N
    if (valueN < low_limit_Noise_pct) {
        color_N = green;
    } else if (valueN < high_limit_Noise_pct) {
        color_N = orange;
    } else {
        color_N = red;
    }
    Noise.style.backgroundColor = color_N;

    /*____________________________________CO2_________________________________*/
    var CO2 = document.getElementById("CO2-load");
    var valueC = Math.round((measure_data['co2'] / upper_limit_CO2) * 75);
    CO2.style.height = valueC.toString() + '%';
    CO2.setAttribute('title', measure_data['co2']);

    let low_limit_CO2_pct = Math.round((low_limit_CO2 / upper_limit_CO2) * 75);
    let high_limit_CO2_pct = Math.round((upper_limit_CO2 / upper_limit_CO2) * 75);

    let color_C
    if (valueC < low_limit_CO2_pct) {
        color_C = green;
    } else if (valueC < high_limit_CO2_pct) {
        color_C = orange;
    } else {
        color_C = red;
    }
    CO2.style.backgroundColor = color_C;

    /*____________________________________HUMIDITY_________________________________*/
    var Hum = document.getElementById("H-load");
    var valueH = Math.round(measure_data['humidity']);
    Hum.style.height = valueH.toString() + '%';
    Hum.setAttribute('title', measure_data['humidity']);

    let low_limit_HUM_pct = Math.round(low_limit_HUM);
    let high_limit_HUM_pct = Math.round(upper_limit_HUM);

    let color_H
    if (valueH < low_limit_HUM_pct) {
        color_H = green;
    } else if (valueH < high_limit_HUM_pct) {
        color_H = orange;
    } else {
        color_H = red;
    }
    Hum.style.backgroundColor = color_H;

    /*____________________________________ILLUMINANCE_________________________________*/
    var Light = document.getElementById("L-load");
    var valueL = Math.round((measure_data['light'] / upper_limit_IL) * 75);
    Light.style.height = valueL.toString() + '%';
    Light.setAttribute('title', measure_data['light']);

    let low_limit_IL_pct = Math.round(((low_limit_IL) / upper_limit_IL) * 75);
    let high_limit_IL_pct = Math.round(((upper_limit_IL) / upper_limit_IL) * 75);

    let color_L
    if (valueL < low_limit_IL_pct) {
        color_L = green;
    } else if (valueL < high_limit_IL_pct) {
        color_L = orange;
    } else {
        color_L = red;
    }
    Light.style.backgroundColor = color_L;
}
