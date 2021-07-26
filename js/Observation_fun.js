

var Current_day = "Hello";
window.addEventListener("load", () => {
    //We define the IdPlant, author and comment default value
    var IdPlant = 1234;
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




// When the user clicks anywhere outside of the modal of the edit button, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

//    let image_input = document.getElementById('image-upload')
//    image_input.value = image;
    //An array of images is created for each observation
    var uploaded_images = [];
    var imageid = 0;
//************************UPLOAD THE IMAGES**********************************
    $('#file-input').on('change',e=>{
        if(e.target.files[0] != null) {
            var image_instance = new Object();
            image_instance.id = imageid++;
            console.log(image_instance.id)
            image_instance.file = e.target.files[0];
            uploaded_images.push(image_instance);
            Display_images(uploaded_images)
        }
    })
//*****************************PREVIEW OF THE IMAGES*************************************//
    function Display_images(uploaded_images){
        let image_container = $('#image-container')
        image_container.empty();
        uploaded_images.forEach(image_instance=>{
            //An object of an image instance is generated to store the image main values.
            image_div = document.createElement('div')
            image_div.id = 'img' + image_instance.id
            let img_delete_btn = document.createElement('button');
            //let delete_icon = document.createElement('i')
            img_delete_btn.textContent = 'Delete'
            img_delete_btn.className = 'obs-btn-img'
            //delete_icon.className = "fa fa-close"
            //img_delete_btn.append(delete_icon)
            $(img_delete_btn).click(function() {DeleteImage(image_instance.id)} )
            image_div.append(img_delete_btn)
            let img_preview_btn = document.createElement('button');
            img_preview_btn.textContent = 'Preview'
            img_preview_btn.className = 'save-btn-img'
            $(img_preview_btn).click(function(){PreviewImage(image_instance)})
            image_div.append(img_preview_btn)
            image_link = document.createElement('a')
            image_link.textContent=image_instance.file.name
            image_div.append(image_link)
            //image_div.link =
            image_container.append(image_div)
            }
        )
    }
//***********************+DELETE IMAGE FUNCTION************************//
    function DeleteImage(id){
        console.log(id)
        //uploaded_images.splice(id,1)
        delete uploaded_images[id]
        Display_images(uploaded_images)
    }
//**********************PREVIEW IMAGE FUNCTION*************************//
    // Get the modal to preview the image
    let modal_img = document.getElementById("myModal-image")
    let span_img = document.getElementsByClassName("close_img")[0];
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal_img) {
            modal_img.style.display = "none";
        }
    }
    span_img.onclick = function() {
        modal_img.style.display = "none";
    }
    /*
    function readURL(input) {
        if (input.file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#blah').attr('src', input.file);
                console.log('succeed1!')
            };
            reader.readAsDataURL(input.file);
            console.log('succeed2!')
        }
    }
*/
    function readURL(input) {
        if (input.file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.file);
        }
    }

    function PreviewImage(image){
        modal_img.style.display = "block"
        readURL(image)
        //uploaded_images.splice(id,1)
        //delete uploaded_images[id]
        //Display_images(uploaded_images)
    }

    let input_button = document.getElementById('saveButton')
    input_button.addEventListener('click', function () {
        let written_value = written_input.value
        let name = author_input.value
        //let image = image_input.value
        saveComment(name, written_value)
    })

    $('#image-upload').on('click', function() {
        $('#file-input').trigger('click');
    });

//**********************LOADING COMMENTS*************************//
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

//**********************THE CONNECTION TO SAVE AN OBSERVATION TO THE DATABASE IS GENERATED*************************//
    function saveComment(name, written_value) {
        let Info_Json = {IdPlant: IdPlant, Name: name , Text: written_value, Image: image }
        let form_data = new FormData();
        form_data.append('IdPlant', IdPlant);
        form_data.append('Name', name);
        form_data.append('Text', written_value);
        form_data.append('Images_num', uploaded_images.length);
        let image_count = 0
        uploaded_images.forEach(image =>
        {
            form_data.append('file' + ++image_count, image.file)
        })
        /*form_data.append('file', uploaded_images);*/
        $.ajax({
            url: 'Actions/AddObservation.php',
            contentType: false,
            processData: false,
            cache: false,
            method: 'post',
                  data: form_data,
            success: function () {
                checkDBcomments(IdPlant)
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    };
    //**********************MODAL*************************//
// Get the modal
    let modal = document.getElementById("myModal");

// Function to display all observations from the database with their corresponding buttons.
    function display(Json_string) {
        console.log('Here!')
        let Json_data = JSON.parse(Json_string)
        console.log('Here2!')
        let comment_container = $('#comment_container')
        comment_container.empty();
        Object.values(Json_data).forEach(obs=>{
            console.log(obs)
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



            // Get the <span> element that closes the modal
            let span = document.getElementsByClassName("close")[0];
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
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