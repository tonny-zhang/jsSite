<?php
$redis = new Redis();
$redis->connect('10.10.30.116', 6379);

/*$redis->set('key', 'value');

echo $redis->get('key')."\n";

$redis->setex('key', 3600, 'value'); // sets key → value, with 1h TTL.

$redis->set('key1', 'val1');
$redis->set('key2', 'val2');
$redis->set('key3', 'val3');
$redis->set('key4', 'val4');

$redis->delete('key1', 'key2');
echo $redis->get('key3')."\n" ;

$redis->delete(array('key3', 'key4'));
*/
$redis->lPush('key_list','one');
$redis->lPush('key_list','two');
$redis->lPush('key_list',array('three_1','three_2'));
$arr = $redis->lRange('key_list',0,-1);
var_dump($arr);
var_dump($redis->get('key_list'));
?>