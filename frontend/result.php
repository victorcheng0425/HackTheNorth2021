<?php
session_start();
session_unset();
session_destroy();
session_start();
$search_key = $_POST['search_key'];
$date = date_create();
$result_folder = date_timestamp_get($date);
$result_path = "results/" . $result_folder;
mkdir($result_path);

$search_key = str_replace(" ", "+", $search_key);
// call search method
$url = 'http://localhost:3000/search/' . $search_key;
// echo $url;
// $ch = curl_init();
// curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
// $response = curl_exec($ch);
// curl_close($ch);
// echo $response;

$response = file_get_contents($url);
$input = json_decode($response, true);
$_SESSION['input'] = $input;
// echo $response;
// echo $result[1]['title'];

header("Location: index.php?hascontent=1");