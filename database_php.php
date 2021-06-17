<?php
$servername = "mysql";
$database = "Teaspils_DB";
$username = "admin";
$password = "TIDE2021";

// Create Connection

$conn = mysqli_connect($servername, $database, $username, $password);

// Check the connection

if (!$conn){
    die("Connection Failed: " .mysqli_connect_error());
}

echo "connected succesfully";
mysqli_close($conn);
?>
