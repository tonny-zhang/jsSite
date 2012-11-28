<?php
/*一定要保证文件编码的一致性，淘宝默认要求utf8编码，本地编码相互调用都要求utf8编码*/
error_reporting(E_ALL ^ E_NOTICE);
require('./TaoBaoke.php');
$url = $_GET['url']?:'http://item.taobao.com/item.htm?id=20366580184';
$result = Helper_TaoBaoKe::Get($url);
echo '<a href="'.$result.'" target="_blank">'.$url.'</a>';
?>