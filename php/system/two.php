<?php
$curl = curl_init();
curl_setopt( $curl, CURLOPT_URL, 'http://js.zk.com/php/system/one.php' );
curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt( $curl, CURLOPT_USERAGENT, "Mozilla/4.0" );
$result = curl_exec($curl);
var_dump($result);