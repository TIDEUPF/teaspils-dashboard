<?php
include ('../DB_Connection.php');
$Image = $_GET['ImageId'];
global $conn;


if (isset($_GET['ImageId'])) {
    //$IdObservation to define
    //$sql = mysqli_query($conn, "SELECT * FROM ImagesObs_Teaspils_DB WHERE IdObs =" . $_GET['image_id']);
    $sql = "SELECT Img FROM ImagesObs_Teaspils_DB WHERE Id =" . $_GET['ImageId'];
    $result = mysqli_query($conn, $sql) or die("<b>Error:</b> Problem on Retrieving Image BLOB<br/>" . mysqli_error($conn));
    $row = mysqli_fetch_array($result);
    header("Content-type: " . $row["imageType"]);
    echo $row["Img"]; //Tornem el blob
}
