<?php
function getUrl($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	$ret = curl_exec($ch);
	$info = curl_getinfo($ch,CURLINFO_EFFECTIVE_URL);
	var_dump($info);
	curl_close($ch);
exit();
	if($info['http_code'] == 302){
		$jsPath = $info['url'];
		$toPath = substr($jsPath,strpos($jsPath,'tu=')+3);
		echo $jsPath,$toPath,'<br/>';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $toPath);
		curl_setopt($ch,CURLOPT_REFERER,$jsPath);
		$ret = curl_exec($ch);
		$info = curl_getinfo($ch);
		var_dump($info);
		curl_close($ch);
	}
}
$url = "http://s.click.taobao.com/t?e=zGU34CA7K%2BPkqB07S4%2FK0CITy7klxn%2F7bvn0ay1FVIgkwTPSKXBh2zM0%2BWI6rvKoCCj1o7CASxvSvN9SNJ80pXfzoki6LMVUpH5GS27VfJKHbnF0pDPhqC0wUj4dVBTX0pjKyEpREmGfCd%2BmPfH8ORl%2FwaMotBCmTo7Y%2Fnw%2BB2DwL7A3wpfEi33xOEvSrtgp&spm=2014.12145346.1.0";
//getUrl($url);
$command = 'node e:/nodejsSite/getTaobaoItemUrl.js '.$url;

$info = system($command);
var_dump($info);
?>