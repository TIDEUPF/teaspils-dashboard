

var Current_day = "Hello";
window.addEventListener("load", () => {
    //We define the IdPlant, author and comment default value
    let IdPlant = 1234;
    let author = 'Student Name';
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

    let author_input = document.getElementById('author-name')
    author_input.value = author;

    let input_button = document.getElementById('saveButton')
    input_button.addEventListener('click', function () {
        let written_value = written_input.value
        let name = author_input.value
        console.log(name)
        saveComment(name, written_value)

    })

  function loadComments(name, written_value) {

        let f = new Date();
        let Today = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
        let Date_place = document.getElementById("comment_container");
        let myDate = document.createElement('h2');
        let myText = document.createElement('h3');
        let myName = document.createElement('h4');
        myDate.textContent = Today;
        myText.textContent = written_value;
        myName.textContent = name;
        Date_place.appendChild(myDate);
        Date_place.appendChild(myName);
        Date_place.appendChild(myText);
    };


    function saveComment(name, written_value) {
        let Info_Json = {IdPlant: IdPlant, Name: name , Text: written_value, Image: ' '  }
        $.ajax({
            url: 'Actions/AddObservation.php',
            method: 'post',
            data: {Info_Json: Info_Json},
            success: function (DataJson) {
                loadComments(name, written_value)
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    };

    function display(Json_string) {
        let Json_data = JSON.parse(Json_string)
        Object.values(Json_data).forEach(obs=>{
            let Date_place = document.getElementById("comment_container");
            let myDate_temp = document.createElement('h2');
            let myText_temp = document.createElement('h3');
            let myName_temp = document.createElement('h4');
            myDate_temp.textContent = obs.Date;
            myText_temp.textContent = obs.Observation;
            myName_temp.textContent = obs.Name;
            Date_place.appendChild(myDate_temp);
            Date_place.appendChild(myName_temp);
            Date_place.appendChild(myText_temp);
        })

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