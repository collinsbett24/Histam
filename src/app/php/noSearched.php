<?php 
include 'dbCon.php';

$policies = [];
//
//$name = $_GET['term'];
// $query="SELECT term, COUNT(*) AS term_count FROM serchedTerms GROUP BY term
//    HAVING COUNT(*) >= 1 ORDER BY COUNT(*) ASC limit 0, 20";

  $query= "SELECT  term

			FROM    serchedTerms

			WHERE   term NOT IN      

			(        

			       SELECT  name    

			       FROM    datatable       

			) limit 0, 30";
//}
   if ($result = mysqli_query($mysqli, $query))
	{
		$i = 0;
		while($row = mysqli_fetch_assoc($result))
		{
			$policies[$i]['term'] = $row['term'];
			$policies[$i]['id']=$i;
			// $policies[$i]['term_count'] = $row['term_count'];
			$i++;
		}

		echo(json_encode($policies));
	}
	else{
		http_response_code(404);
	}

 ?>