
var f = new Date();
var Current_day = "Hello";

window.addEventListener("load", () =>
{
    var Date_place = document.getElementById("date");
    window.Current_day = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    const myH2 = document.createElement('h3');
    myH2.textContent = Current_day;
    Date_place.appendChild(myH2);
});