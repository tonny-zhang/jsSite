<?php
$signature = $_GET["signature"];
	$timestamp = $_GET["timestamp"];
	$nonce = $_GET["nonce"];	
			
	$token = 'tonnyzhang';
	$tmpArr = array($token, $timestamp, $nonce);
	sort($tmpArr);
	$a = implode( $tmpArr );
	$tmpStr = sha1( $a );
	
	var_dump($a,$tmpStr,$signature);