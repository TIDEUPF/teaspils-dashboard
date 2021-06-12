/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", () =>
{


 /*INITIALIZE THE LIMITS FOR TEMPERATURE*/
 let low_limit_T = 23;
 let upper_limit_T = 30;

 /*INITIALIZE THE LIMITS FOR THE NOISE*/
 let low_limit_Noise = 50;
 let upper_limit_Noise = 70;





 /*We generate a request to get the .json*/
 const section = document.querySelector('#temp');
 /*Almacenamos la dirección URL del json*/
 const requestURL = 'https://raw.githubusercontent.com/rferrers/Teaspils/main/DataAll.json';
 /*const requestURL = 'https://raw.githubusercontent.com/rferrers/Teaspils/main/DataAll2.json';*/

 /*Creamos una nueva instancia de la clase XMLHttpRequest()*/
 const request = new XMLHttpRequest();
 /*Con el open hacemos una solicitud del Request*/
 request.open('GET', requestURL);
 /*Definimos que el tipo de archivo que usaremos sera un json*/
 request.responseType = 'json';
 request.send();
 /*Cómo manejar la respuesta del servidor*/
 request.onload = function() {

  let Data = request.response;
  loadDashboard(Data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise);

  let button = document.getElementById('fileRequest')
  button.addEventListener('click',function(){
   /*let blob = Data;
   var URL = window.URL || window.webkitURL;
   // try to get URL from Blob
   try{
    var downloadUrl = URL.createObjectURL(blob);
   }
   catch(e){
    console.log(blob)
   }
  window.location.href = window.URL.createObjectURL(blob);*/
   let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Data));
   let downloadLink = document.createElement('a');
   downloadLink.setAttribute('href', dataStr);
   downloadLink.setAttribute('download', 'exportdata.json');
   downloadLink.click();
  });




  /*********************INPUT SETTINGS*************************************/
  /*******************************CO2*************************************/
  let T_input_lowlimit = document.getElementById('myInputLowT')
  T_input_lowlimit.value = low_limit_T;

  let T_input_highlimit = document.getElementById('myInputHighT')
  T_input_highlimit.value = upper_limit_T;

  let input_button_T = document.getElementById('inputButtonT')
  input_button_T.addEventListener('click', function(){
   /*LOW LIMIT OF CO2*/
   console.log('Temp!')
   let input_value_low = T_input_lowlimit.value
   if (input_value_low > 80) {
    input_value_low = 80  }
   low_limit_T = input_value_low;

   /*HIGH LIMIT OF CO2*/
   let input_value_high= T_input_highlimit.value
   if (input_value_high > 100) {
    input_value_high = 100  }
   upper_limit_T = input_value_high;
   loadDashboard(Data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise);
  })

  /*******************************NOISE*************************************/

  let Noise_input_lowlimit = document.getElementById('myInputLowNoise')
  Noise_input_lowlimit.value = low_limit_Noise;

  let Noise_input_highlimit = document.getElementById('myInputHighNoise')
  Noise_input_highlimit.value = upper_limit_Noise;

  let input_button_Noise = document.getElementById('inputButtonNoise')
  input_button_Noise.addEventListener('click', function(){
   /*LOW LIMIT OF CO2*/
   console.log('Noise!')
   let input_value_low = Noise_input_lowlimit.value
   if (input_value_low > 80) {
    input_value_low = 80  }
   low_limit_Noise = input_value_low;
   console.log(low_limit_Noise)

   /*HIGH LIMIT OF CO2*/
   let input_value_high= Noise_input_highlimit.value
   if (input_value_high > 100) {
    input_value_high = 100  }
   upper_limit_Noise = input_value_high;
   loadDashboard(Data, low_limit_T, upper_limit_T, low_limit_Noise, upper_limit_Noise);
  })

  let hide_button = document.getElementById("hiding-btn");
  hide_button.addEventListener('click', function(){
   console.log('click me!')
   let x = document.getElementById("limits-setting")
   if (x.style.display === "none") {
    x.style.display = "block";
   } else {
    x.style.display = "none";
   }
  })


  /*showTemp(Temperatures);
  }   */

 };

 document.body.classList.add("loaded"); 
});

const red = '#FF3104';
const green = '#4AD347';
const orange = '#E8B147';

/*
function download(Data){
 let MIME_TYPE = "text/json";
 let blob = Data;
 if (typeof Data === 'undefined'){
  return;
 }
 window.location.href = window.URL.createObjectURL(blob);
}
*/

function loadDashboard(Data, low_limit_T, high_limit_T, low_limit_Noise, high_limit_Noise){

 let Date_place = document.getElementById("date");

 let myH2 = document.createElement('h3');

 myH2.textContent = Data['Date'][0].Value;
 Date_place.textContent = myH2.textContent;
 /*appendChild(myH2);*/

 /*____________________________________TEMPERATURE_________________________________*/
 let Temperature = document.getElementById("T-load");
 let valueT = Math.round((Data['Temperature'][0].Value/40)*100);

 let low_limit_T_pct = Math.round((low_limit_T/40)*100);
 let high_limit_T_pct = Math.round((high_limit_T/40)*100);

 Temperature.style.height = valueT.toString()+'%' ;
 let color_T
 if (valueT < low_limit_T_pct) {
  color_T = green;
 } else if (valueT < high_limit_T_pct){
  color_T  = orange;
 } else {
  color_T = red;
 }
 Temperature.style.backgroundColor = color_T;

 /*____________________________________NOISE_________________________________*/
 let Noise = document.getElementById("N-load");
 let valueN = Math.round((Data['Noise'][0].Value/100)*100);
 Noise.style.height = valueN.toString()+'%' ;

 let low_limit_Noise_pct = Math.round((low_limit_Noise/100)*100);
 let high_limit_Noise_pct = Math.round((high_limit_Noise/100)*100);

 let color_N
 if (valueN < low_limit_Noise_pct) {
  color_N = green;
 } else if (valueN < high_limit_Noise_pct){
  color_N = orange;
 } else {
  color_N = red;
 }
 Noise.style.backgroundColor = color_N;

 var CO2 = document.getElementById("CO2-load");
 var valueC = Math.round((Data['CO2'][0].Value/2000)*100);
 CO2.style.height = valueC.toString()+'%';
 let color_C
 if (valueC < 60) {
  color_C = green;
 } else if (valueC < 80){
  color_C = orange;
 } else {
  color_C = red;
 }
 CO2.style.backgroundColor = color_C;

 var Hum = document.getElementById("H-load");
 var valueH = Math.round(Data['Humidity'][0].Value);
 Hum.style.height = valueH.toString()+'%';
 let color_H
 if (valueH < 60) {
  color_H = green;
 } else if (valueH < 80){
  color_H = orange;
 } else {
  color_H = red;
 }
 Hum.style.backgroundColor = color_H;

 var Light = document.getElementById("L-load");
 var valueL = Math.round((Data['Light'][0].Value/2000)*100);
 Light.style.height = valueL.toString()+'%';
 let color_L
 if (valueL < 60) {
  color_L = green;
 } else if (valueL < 80){
  color_L = orange;
 } else {
  color_L = red;
 }
 Light.style.backgroundColor = color_L;
}
