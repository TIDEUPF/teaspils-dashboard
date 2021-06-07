
var f = new Date();
var Current_day = "Hello";

window.addEventListener("load", () =>
{
    var Date_place = document.getElementById("date");
    window.Current_day = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    const myH2 = document.createElement('h3');
    myH2.textContent = Current_day;
    Date_place.appendChild(myH2);

    let written_input = document.getElementById('myInput')
    input_limit.value = low_limit;

    let input_button = document.getElementById('inputButton')
    input_button.addEventListener('click', function(){
        let input_value = input_limit.value
        if (input_value > 80) {
            input_value = 80  }
        low_limit = input_value;
        console.log(Data)
        loadDashboard(Data, low_limit)
    })
});