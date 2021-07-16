

var Current_day = "Hello";
window.addEventListener("load", () => {
    //We define the IdPlant, author and comment default value
    let IdPlant = 1234;
    let author = 'Student Name';
    let comment = 'Please write some of your thoughts in here...';
    let image = null;
    let Date_place = document.getElementById("date");
    let f = new Date();
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

    let id_plant_displayer = document.getElementById('id_disp')
    id_plant_displayer.value = IdPlant;




// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

//    let image_input = document.getElementById('image-upload')
//    image_input.value = image;

    var uploaded_image;
    $('#image-upload').on('change',e=>{
        uploaded_image = e.target.files[0];
        console.log(uploaded_image)
    })

    let input_button = document.getElementById('saveButton')
    input_button.addEventListener('click', function () {
        let written_value = written_input.value
        let name = author_input.value
        //let image = image_input.value
        saveComment(name, written_value, uploaded_image)

    })
/*
**************IMAGE**************+
    let image_btn = document.getElementById('img-btn')
    image_btn.addEventListener('click',  function(event) {
        let image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
        console.log('hello!')
    });
    */


  function loadComments(name, written_value) {
        let f = new Date();
        let Today = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
        let comment_container = document.getElementById("comment_container");
        let comment = document.createElement('div')
        let myDate = document.createElement('h2');
        let myText = document.createElement('h3');
        let myName = document.createElement('h4');
        myDate.textContent = Today;
        myText.textContent = written_value;
        myName.textContent = name;
        comment.appendChild(myDate);
        comment.appendChild(myName);
        comment.appendChild(myText);
        comment_container.append(comment)
    };

    // THE CONNECTION TO SAVE AN OBSERVATION TO THE DATABASE IS GENERATED
    function saveComment(name, written_value, image) {
        let Info_Json = {IdPlant: IdPlant, Name: name , Text: written_value, Image: image }
        let form_data = new FormData();
        form_data.append('IdPlant', IdPlant);
        form_data.append('Name', name);
        form_data.append('Text', written_value);
        form_data.append('file', image);
        $.ajax({
            url: 'Actions/AddObservation.php',
            method: 'post',
                  data: {Info_Json: Info_Json},
                  //data: form_data,
            success: function () {
                checkDBcomments(IdPlant)
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    };



    //**********************MODAL*************************
// Get the modal
    let modal = document.getElementById("myModal");

// Function to display all observations from the database with their corresponding buttons.
    function display(Json_string) {
        let Json_data = JSON.parse(Json_string)
        let comment_container = $('#comment_container')
        comment_container.empty();
        Object.values(Json_data).forEach(obs=>{
            let comment = document.createElement('div')
            comment.classList.add('comment')
            let myDate_temp = document.createElement('h2');
            myDate_temp.textContent = obs.Date;
            let obs_div = document.createElement('div')
            obs_div.classList.add('observation')
            let myName_temp = document.createElement('h4');
            let myText_temp = document.createElement('div');
            myText_temp.classList.add('observation_text')
            let myLinks_temp = document.createElement('ul');
            myText_temp.textContent = obs.Observation;
            myName_temp.textContent = obs.Name;
            myLinks_temp.textContent = obs.Image;
            obs_div.append(myName_temp);
            obs_div.append(myText_temp);
            obs_div.append(myLinks_temp);

            //The delete button performance is defined.
            let delete_btn = document.createElement('button');
            delete_btn.textContent = 'Delete'
            //$(edit_btn).click(function(){ editComment(obs.IdObservation)})
            $(delete_btn).click(function(){ deleteComment(obs.IdObservation)})

            //The edit button performance is defined.
            let edit_btn = document.createElement('button');
            edit_btn.textContent = 'Edit'

            let save_btn_modal = document.getElementById('saveButton-modal')


            // Get the button that opens the modal
            //    let btn = document.getElementById("myBtn");

            // Get the <span> element that closes the modal
            let span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal and fill all blank spaced with the observation data
            edit_btn.onclick = function() {
                modal.style.display = "block";
                let written_input_modal = document.getElementById('comment-maker-modal')
                written_input_modal.value = obs.Observation;

                let author_input_modal = document.getElementById('author-name-modal')
                author_input_modal.value = obs.Name;

                let Obs_id_modal = document.getElementById('Obs-id-modal')
                Obs_id_modal.value = obs.IdObservation;


            }

            //The save button to edit a specific observation is generated.

            save_btn_modal.onclick = function() {
                modal.style.display = "none";
                let text_modal = document.getElementById('comment-maker-modal')
                let name_modal = document.getElementById('author-name-modal')
                let obs_id = document.getElementById('Obs-id-modal')
                let Info_Json_modal = {IdPlant: IdPlant, Name: name_modal.value , Text: text_modal.value, Image: ' ', IdObservation: obs_id.value}
                console.log(Info_Json_modal)
                $.ajax({
                    url: 'Actions/EditObservation.php',
                    method: 'post',
                    data: {Info_Json: Info_Json_modal},
                    //data: form_data,
                    success: function () {
                        checkDBcomments(IdPlant)
                    },
                    error: function(xhr, status, error) {
                        console.log(error);
                    }
                });
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            comment.append(myDate_temp);
            comment.append(obs_div);
            comment.append(delete_btn);
            comment.append(edit_btn);
            comment_container.append(comment)
        })

    }



    // THE CONNECTION TO CHECK ALL EXISTING OBSERVATIONS IS GENERATED

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

    // THE CONNECTION TO DELETE AN OBSERVATION FROM THE DATABASE IS GENERATED
    function deleteComment(Id){
        $.ajax({
            url: 'Actions/DeleteObservation.php',
            method: 'post',
            data: {IdObservation: Id},
            success: function() {
                console.log('Succeed!!')
                checkDBcomments(IdPlant)

            },
            error: function(xhr, status, error) {
                console.log(error);
            }

        });
    }

    function editComment(Id){
        console.log(Id)
    }
});