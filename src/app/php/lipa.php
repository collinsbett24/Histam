<?php 

if ($_SERVER['REQUEST_METHOD']='GET') {

    $p_number = $_GET['p_number'];
    if (!empty($p_number)) {
    $number = 254000000000 + $p_number;
    echo($number);

$headers = ['Content-Type:application/json; charset-utf8'];

 $url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
 //initialize variables
 
 // $consumer_key = 'H5a0sNr3bnF9338Ic561SlUxjt4RpJRb';
 // $consumer_secret = 'eQmH2U110R2q2bDL';

  $consumer_key = '38oG51iUTzf4rXjeGsJ8GVksP8PHGsyp';
 $consumer_secret = 'T26IgJdosxuzAdhl';
  
  $curl = curl_init($url);
  //curl_setopt($curl, CURLOPT_URL, $url);
  $credentials = base64_encode($consumer_key.":".$consumer_secret);
  curl_setopt($curl, CURLOPT_HEADER, $headers);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_USERPWD, $consumer_key.":".$consumer_secret);
  //curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Basic '.$credentials)); //setting a custom header

  $result = curl_exec($curl);
  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
  $result = json_decode($result);
  $access_token = $result->access_token;
  curl_close($curl);


	//initiating the transaction

  //define the variables
	$initiator_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

	$BusinessShortCode = '174379';
	$Timestamp = date('Ymdhis');
	$PartyA = $number; //2547..
	$Amount = '50';
	//$CallBackURL = 'http://192.168.43.198/search/search/src/app/php/mpay/callback.php';
  $CallBackURL = 'https://www.histam.com/php/mpay/callback.php';
	$AccountReference = '';
	$TransactionDesc = 'Document Payment';
	$PassKey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
	$Password = base64_encode($BusinessShortCode.$PassKey.$Timestamp);

     $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $initiator_url);
  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json','Authorization:Bearer '.$access_token)); //setting custom header
  
  
  $curl_post_data = array(
    //Fill in the request parameters with valid values
    'BusinessShortCode' => $BusinessShortCode,
    'Password' => $Password,
    'Timestamp' => $Timestamp,
    'TransactionType' => 'CustomerPayBillOnline',
    'Amount' =>  $Amount,
    'PartyA' => $PartyA,
    'PartyB' => $BusinessShortCode,
    'PhoneNumber' => $PartyA,
    'CallBackURL' => $CallBackURL,
    'AccountReference' => $AccountReference,
    'TransactionDesc' => $TransactionDesc
  );
  
  $data_string = json_encode($curl_post_data);
  
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
  
  $curl_response = curl_exec($curl);
  print_r($curl_response);
  
  echo $curl_response;
}
else
{
  echo("invalid PhoneNumber");
}
}

 ?>