<?php
$servername = "mysql";
$database = "Teaspils_DB";
$username = "admin";
$password = "TIDE2021";

// Create Connection
global $conn;  //Generamos la variable como global

$conn = mysqli_init();
if (!$conn) {
die('Falló mysqli_init');
}

if (!mysqli_options($conn, MYSQLI_INIT_COMMAND, 'SET AUTOCOMMIT = 0')) {
die('Falló la configuración de MYSQLI_INIT_COMMAND');
}

if (!mysqli_options($conn, MYSQLI_OPT_CONNECT_TIMEOUT, 5)) {
die('Falló la configuración de MYSQLI_OPT_CONNECT_TIMEOUT');
}

if (!mysqli_real_connect($conn, $servername, $username , $password, $database)) {
die('Error de conexión (' . mysqli_connect_errno() . ') '
. mysqli_connect_error());
}

?>
