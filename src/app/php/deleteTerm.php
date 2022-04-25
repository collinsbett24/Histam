<?php
include 'dbCon.php';
if ($_SERVER['REQUEST_METHOD']='GET') {

$nam = $_GET['title'];
$query='';
//$data=array();
// $policies = [];
 

 	//$name = mysqli_real_escape_string($mysqli, trim($request->title));

 		$query = "DELETE FROM serchedTerms WHERE (name LIKE '%$nam%')";
 	if ($result = mysqli_query($mysqli, $query))
	{
		$message='Delete Successfull';
		echo($message);

	}
	else{
		http_response_code(404);
	}
}
 ?>