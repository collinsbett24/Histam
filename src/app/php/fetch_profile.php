<?php 
	require 'dbCon.php';
	$policies = [];
	$sql = "SELECT * FROM datatable";
	if ($result = mysqli_query($mysqli, $sql))
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
 ?>