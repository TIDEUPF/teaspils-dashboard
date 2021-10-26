<?php

include('../DB_Connection.php');

/*or isset*/
if (empty($_POST['IdObservation'])) {
    header("HTTP/1.0 404 IdPlant not found");
    exit; /*Ya no se ejecuta más*/
}

$IdObservation = $_POST['IdObservation'];


global $conn;

mysqli_query($conn, "DELETE FROM PLANTS_INFO_DB WHERE IdObservation = $IdObservation"); //Eliminamos la fila correspondiente

if (mysqli_affected_rows($conn)) {
    mysqli_query($conn, "commit");
    header("HTTP/1.0 200 The observation was deleted");/*Success*/
} else {
    header("HTTP/1.0 404 No observations found");/*Ya no se ejecuta más*/
}
mysqli_close($conn);
exit;