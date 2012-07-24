<?php
echo time().'<br/>';
$str = date('Y-m-d H:i:s');
echo $str .'<br/>';
echo strtotime($str).'<br/>';
function foo(&$var)
{
    $var++;
	return $var;
}
function &bar()
{
    $a = 5;
    return $a;
}
echo foo(bar());
function &test() 
{ 
	static $b=0;//申明一个静态变量 
	$b=$b+1; 
	echo $b; 
	return $b; 
} 
$a=test();//这条语句会输出　$b的值　为１ 
$a=5; 
$a=test();//这条语句会输出　$b的值　为2 

$a=&test();//这条语句会输出　$b的值　为3 
$a=5; 
$a=test();//这条语句会输出　$b的值　为6 

$arr = array('person'=>array('name'=>'test','age'=>10));
function test1(&$obj){
	$obj['name'] .= ' hello';
}
foreach($arr as $k => &$v){
	test1($v);
}
//This will report:Deprecated: Call-time pass-by-reference has been deprecated
//You can set php.ini,allow_call_time_pass_reference = On
//test1(&$arr['person']);
unset($v);
var_dump($arr);
?>