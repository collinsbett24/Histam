<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD']='GET') {

    $p_number = $_GET['p_number'];
    if (!empty($p_number)) {
    $number = 254000000000 + $p_number;
    //echo($number);
//Authenticate your app-----Access Token

//sandbox consumer key and secret key are below
$consumerKey='H5a0sNr3bnF9338Ic561SlUxjt4RpJRb';
 $consumerSecret='eQmH2U110R2q2bDL';

//live consumer key and secret key are below
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
//echo 'The access token is: '.$access_token;
curl_close($curl);
//Lipa na M-Pesa Online Payment API is used to initiate
$url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';//sktpush url

$BusinessShortCode='174379';//sandbox shortcode

//$BusinessShortCode='4041831';//live shortcode
 $Passkey='bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';//sandbox passkey
//$Passkey='b637246b2911c414f0661ac85a2f8f489611dbe390fd6bf181afc9b90f646692'; //live api passkey
$Timestamp=date("YmdHis");//timestamp
$Password=base64_encode($BusinessShortCode.$Passkey.$Timestamp);//password encoded Base64
//log password and timestamp
$logFile = "mpay/records.txt";
$log = fopen($logFile, "a");
fwrite($log, "Password=".$Password);
fwrite($log, " Timestamp=".$Timestamp);
fclose($log);

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json', 'Authorization:Bearer '.$access_token)); //setting custom header
$curl_post_data = array(
    //Fill in the request parameters with valid values
    'BusinessShortCode' => $BusinessShortCode,//The organization shortcode used to receive the transaction.
    'Password' => $Password,//This is generated by base64 encoding BusinessShortcode, Passkey and Timestamp.
    'Timestamp' => $Timestamp,//The timestamp of the transaction in the format yyyymmddhhiiss.
    'TransactionType' => 'CustomerPayBillOnline',//The transaction type to be used for this request.
    'Amount' => '1',//The amount to be transacted.
    'PartyA' => $number,//The MSISDN sending the funds.
    //'PartyB' => '4041831',//The organization live shortcode receiving the funds
    'PartyB' => '174379',//sandbox shortcode
    'PhoneNumber' => $number,//The MSISDN sending the funds.
    'CallBackURL' => 'https://www.histam.com/php/mpay/callback.php',//The url to where logs from M-Pesa will be sent to.
    'AccountReference' => 'MOONLANDING',//Used with M-Pesa PayBills.
    'TransactionDesc' => 'MOONLANDING SOLUTIONS Payment'//A description of the transaction.
);
$data_string = json_encode($curl_post_data);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
$curl_response = curl_exec($curl);
echo(json_encode($curl_response));

/******* log the response**********/
$logFile = "mpay/stkpush.txt";
// write the M-PESA Response to file
$log = fopen($logFile, "a");
fwrite($log, $curl_response);
fclose($log);
//display result
//echo $curl_response;

}
}
?>