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
         //Le añadimos elementos a la array, donde cada posición sera un elemento.
        $IdObservation = $row['IdObservation'];

        $Result_imgs = mysqli_query($conn, "SELECT * FROM ImagesObs_Teaspils_DB WHERE IdObs = $IdObservation");
        $ImgJson = array();
        $img_count = 0;
        while($row_img = mysqli_fetch_assoc($Result_imgs))
        {
            $img_count = $img_count + 1;
            $image_values=[];
            $image_values['Id'] = $row_img['Id'];
            $image_values['Image_Name'] = 'Image'.$img_count;
            $image_values['IdObs'] = $row_img['IdObs'];
            //$image_values['Img'] = base64_encode($conn, $row_img['Img']);
            $ImgJson[] = $image_values;
        }
        if(count($ImgJson)>0) {
            $ImgContainer['Images'] = $ImgJson;
            $DataJson[] = array_merge($row,$ImgContainer);
            //$DataJson[] = $row;
            //$DataJson['Image'] = $ImgJson;
            //echo json_encode($DataJson);
            //$DataJson[] = array_merge($row,$ImgContainer);
        }
        else{
            $DataJson[] = $row;
        }
    }
    $encode_Json = json_encode($DataJson);
    echo $encode_Json;

}
else{
    header("HTTP/1.0 404 No observations found");/*Ya no se ejecuta más*/
}
exit;

