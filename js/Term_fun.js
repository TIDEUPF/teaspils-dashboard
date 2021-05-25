/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
* PREGUNTES:
* Perk la pagina te el slider d'abaix?
* Fer-lo responsive?
*
* */
/*We initialize the variables as global*/
var Real_date = "hello" ; 
var Real_Temperature = 15; 
var Real_CO2 = 15;  
var Real_Light = 15;  
var Real_Humidity = 15; 
var Real_Noise = 15; 

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
const Data = request.response;
/*showTemp(Temperatures);
}   */

const Date = Data['Date'];
window.Real_date = Date[0].Value;

const Temperature = Data['Temperature'];
window.Real_Temperature = Temperature[0].Value;

const Noise = Data['Noise'];
window.Real_Noise = Noise[0].Value;

const CO2 = Data['CO2'];
window.Real_CO2 = CO2[0].Value;

const Light = Data['Light'];
window.Real_Light = Light[0].Value;

const Humidity = Data['Humidity'];
window.Real_Humidity = Humidity[0].Value;

};

const red = '#FF3104';
const green = '#4AD347';
const orange = '#E8B147';

window.addEventListener("load", () => 
{
 
 var Date_place = document.getElementById("date");
 
 const myH2 = document.createElement('h3');
 myH2.textContent = Real_date;
 Date_place.appendChild(myH2);
 
 
 var Temperature = document.getElementById("T-load");
 const valueT = Math.round((Real_Temperature/40)*100);
 Temperature.style.height = valueT.toString()+'%' ;
 Temperature.style.backgroundColor = green;
 
 var Noise = document.getElementById("N-load");
 const valueN = Math.round((Real_Noise/100)*100);
 Noise.style.height = valueN.toString()+'%' ;
 Noise.style.backgroundColor = green;
 
 var CO2 = document.getElementById("CO2-load");
 const valueC = Math.round((Real_CO2/2000)*100);
 CO2.style.height = valueC.toString()+'%';
 CO2.style.backgroundColor = red;
 
 var Hum = document.getElementById("H-load");
 const valueH = Math.round(Real_Humidity);
 Hum.style.height = valueH.toString()+'%';
 Hum.style.backgroundColor = orange;
 
 var Light = document.getElementById("L-load");
 const valueL = Math.round((Real_Light/2000)*100);
 Light.style.height = valueL.toString()+'%';
 Light.style.backgroundColor = green;
 
 document.body.classList.add("loaded"); 
});
