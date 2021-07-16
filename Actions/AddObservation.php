<?php
include ('../DB_Connection.php');

/*or isset*/
if (empty($_POST['Info_Json'])){
    header("HTTP/1.0 404 IdPlant not found");
    exit; /*Ya no se ejecuta más*/
}
//$IdPlant = $_POST['IdPlant'];
//$Name = $_POST['Name'];
//$Text = $_POST['Text'];
//$Image = $_POST['file'];

$IdPlant = $_POST['Info_Json']['IdPlant'];
$Name = $_POST['Info_Json']['Name'];
$Text = $_POST['Info_Json']['Text'];
$Image = $_POST['Info_Json']['Image'];
$Image = addslashes(file_get_contents($_FILES['userImage']['tmp_name']));
//$Image = $_POST['Info_Json']['file'];

global $conn;

mysqli_query($conn, "INSERT INTO PLANTS_INFO_DB VALUES (NOW(), '$IdPlant','$Text', '$Image', 0,'$Name')"); //Insertamos la nueva observacion

if(mysqli_affected_rows($conn)){
    mysqli_query($conn, "commit");
    header("HTTP/1.0 200 The observation was inserted");/*Success*/
}
else{
    header("HTTP/1.0 404 No observations found");/*Ya no se ejecuta más*/
}
mysqli_close($conn);
exit;

