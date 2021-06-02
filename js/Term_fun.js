/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", () =>
{

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

  var Data = request.response;
  loadDashboard(Data)
  /*showTemp(Temperatures);
  }   */

 };

 document.body.classList.add("loaded"); 
});

const red = '#FF3104';
const green = '#4AD347';
const orange = '#E8B147';

function loadDashboard(Data){

 var Date_place = document.getElementById("date");

 var myH2 = document.createElement('h3');
 myH2.textContent = Data['Date'][0].Value;
 Date_place.appendChild(myH2);

 let Temperature = document.getElementById("T-load");
 let valueT = Math.round((Data['Temperature'][0].Value/40)*100);
 Temperature.style.height = valueT.toString()+'%' ;
 let color_T
 if (valueT < 60) {
  color_T = green;
 } else if (valueT < 80){
  color_T  = orange;
 } else {
  color_T = red;
 }
 Temperature.style.backgroundColor = color_T;


 var Noise = document.getElementById("N-load");
 var valueN = Math.round((Data['Noise'][0].Value/100)*100);
 Noise.style.height = valueN.toString()+'%' ;

 let color_N
 if (valueN < 60) {
  color_N = green;
 } else if (valueN < 80){
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
