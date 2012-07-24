<?php
//由header头里的refer和客户端IP及refer对应的域名所对应的IP进行严格的域外提交限制
/*$domain = 'www.baidu.com';
echo gethostbyname($domain);
var_dump(gethostbynamel($domain));
echo gethostbyaddr('122.11.50.58');
*/
//var_dump($_SERVER);
//var_dump($_REQUEST);

class ValidatePost{
	//这些IP的客户允许使用curl
	static $EXCEPTION_IPS = array('127.0.0.1','10.10.30.2501');
	//允许使用curl
	static $EXCEPTION_DOMAIN = array('js.tonny1.com','www.abc-test.com');
	static function toLog($arg){
		if(is_array($arg)){
			$arg = var_export($arg,true);
		}
		file_put_contents('/validate.txt',date('Y-d-m H:i:s').'  '.$arg.'\r\n');
	}
	//从HTTP_REFERER中分离出上级页面domain
	static function getDomainFromReferer(){
		$rf = @$_SERVER['HTTP_REFERER'];
		if($rf && preg_match_all('/^https?:\/\/([^\/]+)/',$rf,$matchs)){
			return strtolower($matchs[1][0]);
		}
		return false;
	}
	//根据domain得到对应的IP列表并缓存
	static function getRealIp($domain){
		$memcache = new Memcache;
		$memcache->connect('10.10.30.116', 11211) or die ("Could not connect");
		$domain = $domain?$domain:self::getDomainFromReferer();
		if(!$domain){
			return array();
		}
		$ip = $memcache->get($domain);
		if(!isset($ip)){
			$ip = json_encode(gethostbynamel($domain));
			$memcache->set($domain,$ip);
		}
		return json_decode($ip);
	}
	//验证主方法
	static function validate(){
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			$client_ip = $_SERVER['REMOTE_ADDR'];
			$domain = self::getDomainFromReferer();
			self::toLog(array(
				$_SERVER,
				in_array($domain,self::$EXCEPTION_DOMAIN),
				$client_ip,
				self::getRealIp($domain)
				)
			);
			return (
				//在允许IP列表,CURL的得不到domain
				(!$domain && in_array($client_ip,self::$EXCEPTION_IPS)) || 
				//在允许域名//***这里有问题，客户端的IP和域名对应的IP不可能相同
				(in_array($domain,self::$EXCEPTION_DOMAIN) && in_array($client_ip,self::getRealIp($domain))) ||
				//只允许相同域名下的POST,或允许域名下的POST
				($domain == strtolower($_SERVER['SERVER_NAME']))
			);
		}
		return true;
	}
}

if(!ValidatePost::validate()){
	header('Content-type:text/html; charset=utf-8');
	//header( "refresh:3;url=http://www.fandongxi.com" );
	//header( "Location:http://www.fandongxi.com" );
	echo '非法操作';
	exit();
}
echo 'right';
?>