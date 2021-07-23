<?php
include ('../DB_Connection.php');



/*or isset*/
if (empty($_POST['IdPlant'])){
    header("HTTP/1.0 404 IdPlant not found");
    exit; /*Ya no se ejecuta más*/
}
$Id = $_POST['IdPlant'];
global $conn;
$Result = mysqli_query($conn, "SELECT * FROM PLANTS_INFO_DB WHERE IdPlant = '$Id' ORDER BY Date DESC");
//Another array to get from the ddbb images
if(mysqli_num_rows($Result)>0){
    $DataJson = array();//Creamos una array vacía
    while($row = mysqli_fetch_assoc($Result)) {
        //array_merge(arr1, arr2) -> merge them
        //Create a php to get an individual instance of the image and get the value.
        $DataJson[] = $row; //Le añadimos elementos a la array, donde cada posición sera un elemento.
    }
    echo json_encode($DataJson);
}
else{
    header("HTTP/1.0 404 No observations found");/*Ya no se ejecuta más*/
}
exit;

