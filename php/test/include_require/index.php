<?php
/*
include和require在遇到丢失文件的处理时有差异外，其它都一样，都产生一个waring
include丢失文件时程序继续执行，而require则会停止
*/
//	include('./one.js');//它们都不限制引入文件的类型
//	require('./one.js');
//	echo 'variable is '.$variableInChild;
//	//require 'http://www.baidu.com';
//	if(false)
//	include('./two.php');
//	else
//	include('./one.js');
//require('./asdf.html');
try{
	$a = include('./ab.html');
	echo $a;
}catch(Exception $e){
	var_dump($e);
}
echo '<br/>This is after require';
?>