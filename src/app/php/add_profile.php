<?php
include 'dbCon.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
 
 if (isset($postdata) && !empty($postdata)){

 	$folderPath = "uploads/";

 	$name = mysqli_real_escape_string($mysqli, trim($request->name));
	$phone = mysqli_real_escape_string($mysqli, trim($request->phone));
 	$gender = mysqli_real_escape_string($mysqli, trim($request->gender));
 	$location =mysqli_real_escape_string($mysqli, trim($request->location));
 	

 				$sql = "INSERT into `user_profile` (`name`,`phone`,`gender`,`location`) VALUES ('".$name."', '".$phone."' ,'".$gender."', '".$location."')";
			 			if ($mysqli->query($sql) === TRUE) {
							$authdata = [
							'name' => $name,
							'phone' => $phone,
							'gender' => $gender,
							'location' => $location,
							'id' => mysqli_insert_id($mysqli)
						];
					echo(json_encode($authdata));
				}
}
 ?>