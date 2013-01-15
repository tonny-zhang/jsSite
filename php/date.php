<?php 
var_dump(date('Y-m-d H::i::s',strtotime(date('Y-m-d').' 23:59:59')));exit();
//phpinfo();
var_dump(pathinfo('/abc/test.png', PATHINFO_EXTENSION));
echo date('Ymd');exit();
echo mktime(0, 0, 0, 7, 1, 2032).'<br/>';
echo date(DATE_ATOM,2972245600);echo '<br/>';
var_dump($_GET);echo '<br/>';
echo $_GET['d'];echo '<br/>';
var_dump(rawurldecode($_GET['d']));
echo '<br/>';
var_dump(urldecode($_GET['d']));
echo '----<br/>';
$i = 'test+123foo @+%/';
$str = urlencode($i);
echo urldecode($str).'<br/>';
echo rawurlencode($i).'<br/>';
?>