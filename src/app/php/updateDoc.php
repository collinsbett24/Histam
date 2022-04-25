<?php
include 'dbCon.php';

if($_SERVER['REQUEST_METHOD']='POST') {
		$title = $_POST['id'];
		$name = $_POST['name'];
		$description = $_POST['description'];
		$photo = $_POST["myfile"];
		//$photo = $_FILES["myfile"]["name"];

	$sql = "UPDATE datatable SET name = '".$name."', description = '".$description."' WHERE id = '".$title."'";

	if ($mysqli->query($sql) === TRUE) {
		echo("SUCCESS");
	}
	else{
		echo("error");
	}
}
?>