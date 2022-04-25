 <?php
include 'dbCon.php';

	if($_SERVER['REQUEST_METHOD']='POST') {

		$name = $_POST['name'];
		$description = $_POST['description'];
		$photo = $_FILES["myfile"]["name"];

	
	$target_dir = "files/";

	$photoName = basename($photo);

	$target_file_path = $target_dir . $photoName;

	$fileType = pathinfo($target_file_path, PATHINFO_EXTENSION);

	 $path = 'https://www.histam.com/php/files/'.$photoName;

	if(move_uploaded_file($_FILES["myfile"]["tmp_name"], $target_file_path)){

	$sql = "INSERT INTO `datatable` (`name`, `description`, `filename`, `path`) VALUES ('".$name."','".$description."', '".$photoName."', '".$path."')";

	if ($mysqli->query($sql) === TRUE) {
							$authdata = [
							'name' => $name,
							'description' => $description,
							'filename' => $photo,
							'path' => $path,
							'id' => mysqli_insert_id($mysqli)
						];
					echo(json_encode($authdata));
				}else{
		echo(" sql failed");
	}
}
else{
	echo("server file upload failed");
}
}
	  ?>