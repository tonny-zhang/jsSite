<?php

$a = '<xml>
 <ToUserName><![CDATA[toUser]]></ToUserName>
 <FromUserName><![CDATA[fromUser]]></FromUserName>
 <CreateTime>12345678</CreateTime>
 <MsgType><![CDATA[news]]></MsgType>
 <ArticleCount>2</ArticleCount>
 <Articles>
 <item>
 <Title><![CDATA[title1]]></Title> 
 <Description><![CDATA[description1]]></Description>
 <PicUrl><![CDATA[picurl]]></PicUrl>
 <Url><![CDATA[url]]></Url>
 </item>
 <item>
 <Title><![CDATA[title]]></Title>
 <Description><![CDATA[description]]></Description>
 <PicUrl><![CDATA[picurl]]></PicUrl>
 <Url><![CDATA[url]]></Url>
 </item>
 </Articles>
 <FuncFlag>1</FuncFlag>
 </xml> 
';

//$tmp = array();
//$ret = preg_match_all("|<([^\!\<\>]*)>.*<\/\\1>|s", $a, $tmp);
//var_dump($ret, $tmp);

function parseXml($data) {
	$result = array();
	$match = array();
	$ret = preg_match_all("|<([^\!\<\>]*)>(.*?)<\/\\1>|s", $data, $match);
	//var_dump($match);
	if($ret) {
		foreach ($match[1] as $order => $key) {
			if(!isset($result[$key])) {
				$result[$key] = parseXml($match[2][$order]);
			} else {
				if(isset($result[$key][0])) {
					$result[$key][] = parseXml($match[2][$order]);
				} else {
					$tmp = $result[$key];
					$result[$key] = array();
					$result[$key][] = $tmp;
					$result[$key][] = parseXml($match[2][$order]);
				}				
			}
		}
	} else {
		//返回完整的字符串
		//return $data;
		//去掉注释
		return preg_replace("|<\!\[CDATA\[.*\]\]>|s", '', $data);
	}
	return $result;
}
$a = parseXml($a);
var_dump($a);


//$len = strlen($a);
//for ($i = 0; $i < $len; $i++) {
//	echo $a[$i], ord($a[$i]), "\r\n";
//}
