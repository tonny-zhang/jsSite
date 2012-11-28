<?php
function include_file($path){
	echo realpath($path);
	$content = file_get_contents($path);
	eval('?>' . $content);
}
include_file('./Core.class.php');
Core::say();
var_dump(Core::getName());
?>