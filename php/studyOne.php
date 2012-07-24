<?php
register_shutdown_function(function (){
	echo '<br/>----over----<br/>';
});
class Person{
	function run($fn){
		var_dump($fn);
		$fn();
	}
}

$person = new Person();
$person -> run(function(){
	print 'hello world';
});
$s_per = serialize($person);
echo $s_per;
$uns_per = unserialize($s_per);
var_dump($uns_per);
$uns_per->run(function(){
	echo 'unserialize person';
});

?>