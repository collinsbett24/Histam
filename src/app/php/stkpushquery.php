<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD']='GET') {

    $CheckoutRequestID = $_GET['CRequestID'];
    if (!empty($CheckoutRequestID)) {
   // $number = 254000000000 + $p_number;
    //echo($number);
//Authenticate your app-----Access Token

//sandbox keys
$consumerKey='H5a0sNr3bnF9338Ic561SlUxjt4RpJRb';
$consumerSecret='eQmH2U110R2q2bDL';

//live keys
// $consumerKey = '38oG51iUTzf4rXjeGsJ8GVksP8PHGsyp';
// $consumerSecret = 'T26IgJdosxuzAdhl';

$headers=['Content-Type:application/json; charset=utf8'];
$url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
$curl = curl_init($url);
curl_setopt($curl,CURLOPT_HTTPHEADER,$headers);
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl,CURLOPT_HEADER,false);
curl_setopt($curl,CURLOPT_USERPWD,$consumerKey.':'.$consumerSecret);
$result = curl_exec($curl);
$status = curl_getinfo($curl,CURLINFO_HTTP_CODE);
$result = json_decode($result);
$access_token = $result->access_token;


$url_query = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';
  //initialize data

//$BusinessShortCode='4041831';//live shortcode
$BusinessShortCode='174379';//sandbox shortcode
//$Passkey='b637246b2911c414f0661ac85a2f8f489611dbe390fd6bf181afc9b90f646692';//live passkey
$Passkey='bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';// sandboxpasskey
$Timestamp=date("YmdHis");//timestamp
$Password=base64_encode($BusinessShortCode.$Passkey.$Timestamp);//password encoded Base64
//log password and timestamp

  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url_query);
  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json','Authorization:Bearer '. $access_token)); //setting custom header
  
  
  $curl_post_data = array(
    //Fill in the request parameters with valid values
    'BusinessShortCode' => $BusinessShortCode,
    'Password' => $Password,
    'Timestamp' => $Timestamp,
    'CheckoutRequestID' => $CheckoutRequestID
  );
  
  $data_string = json_encode($curl_post_data);
  
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
  
  $curl_response = curl_exec($curl);
  echo(json_encode($curl_response));
  
  //echo $curl_response;
}
else{
	echo "CheckoutRequestID is empty";
}
}

?>