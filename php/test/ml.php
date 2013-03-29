<?php
echo base64_encode('hello').'<br/>';
$mac_nonce = "dj83hs9s";
$data = "abc";
$a = hash_hmac("sha1", $data, "511568BC43F249E4B96A554740BF3704", true);
echo $a.'<br/>';

$str = '';
$str1 = '';
for($i=0;$i<strlen($a);$i++){
	$ascii = ord(substr($a,$i,1));
	$str1 .= $ascii.'+';
	$str .= chr($ascii).'_';
}
$a = base64_encode($a);
echo $a.'<br/>';
echo $str.'<br/>'.$str1;exit();
getGioneeUserId("478D4EAFC394458593ED19E13692AF38>=1357378895","7","A212AC79","9076EA05E6BE09104F35C1BF7D30ECB614390E30");
	
	
	function getGioneeUserId($assoc_handle, $assoc_timestamp, $assoc_nonce, $assoc_signature) {
		$url = "http://id.gionee.com/account/verify.do";
		$mac_appId = "4C31949B1B724B2DB279A0ADB37EB9E8";
		$time = time();
		$mac_timestamp = $time;
		$mac_nonce = "dj83hs9s";
		$data = "$time\n$mac_nonce\nPOST\n/account/verify.do\nid.gionee.com\n80\n\n";
		//??
		$mac_signature = base64_encode(hash_hmac("sha1", $data, "511568BC43F249E4B96A554740BF3704", true));
		//map
		$data = '{"h":"' . $assoc_handle . '","t":"' . $assoc_timestamp . '","n":"' . $assoc_nonce . '","v":"' . $assoc_signature . '"}';
		$length = strlen($data);
		$httpheader = array(
			"POST: /account/verify.do HTTP/1.1",
			"HOST: id.gionee.com",
			"Authorization: MAC id=\"$mac_appId\",ts=\"$mac_timestamp\",nonce=\"$mac_nonce\",mac=\"$mac_signature\"",
			"Content-Type: application/json",
			"Content-Length: $length"
		);
		
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, true);
		//返回结果存放在变量中，而不是默认的直接输出
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $httpheader);
		$result = curl_exec($ch);
		curl_close($ch);
		//writeFile($result);
		var_dump($result);
		return $result;
	}
?>