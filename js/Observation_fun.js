

var Current_day = "Hello";
window.addEventListener("load", () => {
    let comment = 'Please right some of your thoughts in here...';
    console.log(comment)
    var Date_place = document.getElementById("date");
    var f = new Date();
    window.Current_day = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    let Today = window.Current_day + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();

    const myH2 = document.createElement('h3');
    myH2.textContent = Current_day;
    Date_place.appendChild(myH2);

    let written_input = document.getElementById('comment-maker')
    written_input.value = comment;

    let input_button = document.getElementById('saveButton')
    input_button.addEventListener('click', function () {
        let written_value = written_input.value
        console.log(written_value)
        loadComments(written_value)
    })

    function loadComments( written_value){

        var f = new Date();
        let Today = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
        var Date_place = document.getElementById("comment_container");
        let myDate = document.createElement('h2');
        let myH2 = document.createElement('h3');
        myDate.textContent = Today;
        myH2.textContent = written_value;
        Date_place.appendChild(myDate);
        Date_place.appendChild(myH2);
};
});