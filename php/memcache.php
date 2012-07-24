<?php

$memcache = new Memcache;
$memcache->connect('10.10.30.116', 11211) or die ("Could not connect");

$version = $memcache->getVersion();
//echo "Server's version: ".$version."<br/>\n";
$get_result = $memcache->set('key100',false);

$get_result = $memcache->get('key100');
var_dump($get_result);
//var_dump($memcache->getExtendedStats());
exit();
$tmp_object = new stdClass;
$tmp_object->str_attr = 'test';
$tmp_object->int_attr = 123;

$memcache->set('key', $tmp_object, false, 10) or die ("Failed to save data at the server");
echo "Store data in the cache (data will expire in 10 seconds)<br/>\n";

$get_result = $memcache->get('key');
echo "Data from the cache:<br/>\n";

var_dump($get_result);

$val = '我们来自这个世界不同的地方，让我们一起来改变世界吧！我们来自这个世界不同的地方，让我们一起来改变世界吧！我们来自这个世界不同的地方，让我们一起来改变世界吧！我们来自这个世界不同的地方，让我们一起来改变世界吧！我们来自这个世界不同的地方，让我们一起来改变世界吧！我们来自这个世界不同的地方，让我们一起来改变世界吧！我们来自这个世界不同的地方，让我们一起来改变世界吧！我们来自这个世界不同的地方，让我们一起来改变世界吧！';
for($i = 0;$i<10000;$i++){
	$memcache->set('key'.$i, $val.'_'.$i, false, 259200) or die ("Failed to save data at the server");
}
$get_result = $memcache->get('key100');
var_dump($get_result);
?>