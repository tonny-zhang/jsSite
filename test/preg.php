<?php 
$str = '{aabc.b}';
preg_match_all('/{((?:[A-Za-z_]){1}[A-Za-z0-9_.]*)}/', $str, $rs );
print_r($rs);
/*
(?:[A-Za-z_]){1}[A-Za-z0-9_.]*
*/
?>