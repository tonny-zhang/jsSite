<?php
error_reporting (E_ALL ^ E_NOTICE);
$jsondata = "{symbol:'".$_GET['symbol']."', price:".$_GET['price']."}";
//echo json_decode($jsondata;
     //echo $_GET['callback'].'('.$jsondata.')';
//echo json_encode(array('symbol'=>'IBM','price'=>120));
//print_r($_GET);
echo $_GET['callback'].'('.$jsondata.')';
?>