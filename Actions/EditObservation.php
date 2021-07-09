<?php

include('../DB_Connection.php');

/*or isset*/
if (empty($_POST['Info_Json'])) {
    header("HTTP/1.0 404 IdPlant not found");
    exit; /*Ya no se ejecuta más*/
}

$IdPlant = $_POST['Info_Json']['IdPlant'];
$IdObservation = $_POST['Info_Json']['IdObservation'];
$Name = $_POST['Info_Json']['Name'];
$Text = $_POST['Info_Json']['Text'];
$Image = $_POST['Info_Json']['Image'];

global $conn;

mysqli_query($conn, "UPDATE PLANTS_INFO_DB SET Observation=$Text, Name = $Name WHERE IdObservation=$IdObservation AND IdPlant=$IdPlant"); //Insertamos la nueva observacion

if (mysqli_affected_rows($conn)) {
    mysqli_query($conn, "commit");
    header("HTTP/1.0 200 The observation was inserted");/*Success*/
} else {
    header("HTTP/1.0 404 No observations found");/*Ya no se ejecuta más*/
}
mysqli_close($conn);
exit;

