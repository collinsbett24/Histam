<?php
include 'dbCon.php';

if ($_SERVER['REQUEST_METHOD']='GET') {

$name = $_GET['title'];
$query='';
//$data=array();
$policies = [];
$message ='';

if (!empty($name)) {

	$sql = "INSERT INTO serchedTerms (`term`) VALUES('".$name."')";

	if ($resultings = mysqli_query($mysqli, $sql))
	{

 	//$name = mysqli_real_escape_string($mysqli, trim($request->title));

 		$query = "SELECT * FROM datatable WHERE (name LIKE '%$name%'
 							OR description LIKE '%$name%'
 							OR filename LIKE '%$name%')";
 	if ($result = mysqli_query($mysqli, $query))
	{
		$i = 0;
		while($row = mysqli_fetch_assoc($result))
		{
			$policies[$i]['id'] = $row['id'];
			$policies[$i]['name'] = $row['name'];
			$policies[$i]['description']  = $row['description'];
			$policies[$i]['filename'] = $row['filename'];
			$policies[$i]['path'] = $row['path'];
			$i++;
		}

		echo(json_encode($policies));
	}
	else{
		http_response_code(404);
	}
}else{
	echo("saving searchTerm failed");
}
}else{
	$message="Failed. Empty Name";
	echo($message);
}
}
 ?>