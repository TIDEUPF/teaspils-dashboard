

var Current_day = "Hello";
window.addEventListener("load", () => {

    let IdPlant = 1234;
    let comment = 'Please write some of your thoughts in here...';
    var Date_place = document.getElementById("date");
    var f = new Date();
    window.Current_day = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    let Today = window.Current_day + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
    /*****CONECTAMOS CON LA DB*******/
    checkDBcomments(IdPlant)


    const myH2 = document.createElement('h3');
    myH2.textContent = Current_day;
    Date_place.appendChild(myH2);

    let written_input = document.getElementById('comment-maker')
    written_input.value = comment;

    let input_button = document.getElementById('saveButton')
    input_button.addEventListener('click', function () {
        let written_value = written_input.value
        console.log(written_value)
        saveComment(written_value)

    })

  function loadComments(written_value) {

        let f = new Date();
        let Today = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
        let Date_place = document.getElementById("comment_container");
        let myDate = document.createElement('h2');
        let myH2 = document.createElement('h3');
        myDate.textContent = Today;
        myH2.textContent = written_value;
        Date_place.appendChild(myDate);
        Date_place.appendChild(myH2);
    };


    function saveComment(written_value) {
        let Info_Json = {IdPlant: IdPlant, Name: 'Student' , Text: written_value, Image: ' '  }
        $.ajax({
            url: 'Actions/AddObservation.php',
            method: 'post',
            data: {Info_Json: Info_Json},
            success: function (DataJson) {
                loadComments(written_value)
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    };

    function display(Json_string) {
        let Json_data = JSON.parse(Json_string)
        Object.values(Json_data).forEach(obs=>{
            console.log(obs)
        })
        //Json_data.forEach(obs => {
        //    console.log(Json_data)
        //});
    }

    function checkDBcomments(IdPlant) {
        $.ajax({
            url: 'Actions/GetObservations.php',
            method: 'post',
            data: {IdPlant: IdPlant},
            success: function (DataJson) {
                display(DataJson)
            },
            error: function(xhr, status, error) {
                console.log(error);
            }

        });

    }
});