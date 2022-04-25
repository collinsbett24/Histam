<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$db_host= 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'datadb';

// $db_host= 'localhost';
// $db_username = 'histamco_search';
// $db_password = 'wi)(LA3=dYZG';
// $db_name = 'histamco_search';


$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

if ($mysqli->connect_error) {
	die('Error: ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}
 ?>