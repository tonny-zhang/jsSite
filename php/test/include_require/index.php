<?php
/*
include��require��������ʧ�ļ��Ĵ���ʱ�в����⣬������һ����������һ��waring
include��ʧ�ļ�ʱ�������ִ�У���require���ֹͣ
*/
//	include('./one.js');//���Ƕ������������ļ�������
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