<?php 
	$postData = file_get_contents('php://input');

	$file = fopen('callbackResponse.txt', 'w');
	if(fwrite($file, $postData) === FALSE){
		fwrite("Error: no data written");
	}
	fwrite("\r\n");
	fclose($file);

	echo '{"ResultCode": 0, "ResultDesc":"The service was accepted successfully", "ThirdPartyTransactionId":"1234567890"}';
 ?>