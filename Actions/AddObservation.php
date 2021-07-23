<?php
include ('../DB_Connection.php');

$IdPlant = $_POST['IdPlant'];
$Name = $_POST['Name'];
$Text = $_POST['Text'];

if(empty($IdPlant) || empty($Name) || empty($Text))
{
    header("HTTP/1.0 404 Parameters not correct");
    exit; /*Ya no se ejecuta más*/
}

global $conn;
mysqli_query($conn, "INSERT INTO PLANTS_INFO_DB VALUES (NOW(), '$IdPlant','$Text', 0,'$Name')"); //Insertamos la nueva observacion
$IdObs = mysqli_insert_id($conn);

if($IdObs)
{
    $Image_count = $_POST['Images_num'];
    for ($i = 0; $i < $Image_count; $i++) {
        if($_FILES['file' . ($i + 1)])
        {
            //tmp_name -> nombre temporal del fichero.
            //$ImgName = basename($_FILES['file' . ($i + 1)]['tmp_name'])
            $imgData = mysqli_real_escape_string($conn, file_get_contents($_FILES['file' . ($i + 1)]['tmp_name'])); //We get the name of the file
            mysqli_query($conn, "INSERT INTO ImagesObs_Teaspils_DB VALUES (0,'$IdObs','$imgData')");
        }
    }
}

if(mysqli_affected_rows($conn)){
    mysqli_query($conn, "commit");
    header("HTTP/1.0 200 The observation was inserted");/*Success*/
}
else{
    header("HTTP/1.0 404 No observations found");/*Ya no se ejecuta más*/
}
mysqli_close($conn);
exit;

