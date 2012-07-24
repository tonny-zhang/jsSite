<?php
class Cache{
	static $cache = null;
	const LIFETIME_DEFAULT = 3600;//默认缓存时间
	//构造函数　单态模式
	function __construct(){
		if(!self::$cache){
			$memcache = new Memcache();
			$memcache->connect('10.10.30.116', 11211) or die ("Could not connect");
			self::$cache = $memcache;
		}
	}
	//得到缓存值
	function get($key){
		if(self::$cache){
			return self::$cache->get($key);
		}
		return false;
	}
	//设置缓存
	function set($key,$val,$policy,$lifetime){echo 'set '.$key.'<br/>';
		if(self::$cache){
			return self::$cache->set($key,$val,$policy,$lifetime);
		}
		return false;
	}
	//得到缓存值，没有时进行用户级回调并设置缓存
	function getVal($key,$func = null){
		$val = $this->get($key);echo 'value in memcache is:'.$val.'<br/>';
		if((!self::$cache || $val === false) && isset($func)){
			$val = call_user_func($func);
			if(is_array($val)){
				$v = empty($val['_data'])?$val:$val['_data'];
				$policy = empty($val['_policy'])?0:$val['_policy'];
				$lifetime = empty($val['_lifetime'])?self::LIFETIME_DEFAULT:$val['_lifetime'];
				$this->set($key,$v,$policy,$lifetime);
				return $v;
			}else{
				$this->set($key,$val,0,self::LIFETIME_DEFAULT);
			}
		}
		return $val;
	}
}


$c = new Cache();
$val = $c->getVal('a1',function(){
	return '123';
});
var_dump($val);
echo '<br/>';
$val = $c->getVal('a2',function(){
	return array(
		'_data'=>array(1,2,3,4),
		'_lifetime' => 10
	);
});
var_dump($val);
echo '<br/>';
$val = $c->getVal('a3',function(){
	return array(
		array(11,12,13,14),
		'_lifetime' => 20
	);
});
var_dump($val);
echo '<br/>';
$val = $c->getVal('a4');
var_dump($val);
echo '<br/>';
?>