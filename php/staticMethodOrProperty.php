<?php
var_dump($_SERVER);
class Person{
	static $debug = false;
	static function getName(){
		return self::$debug?'debug':'deploy';
	}
}
$uri = $_SERVER['HTTP_REQUEST_URI'] ? $_SERVER['HTTP_REQUEST_URI'] : $_SERVER['REQUEST_URI'];
echo $uri;
Person::$debug = Person::$debug || preg_match('/debug/',$uri);
echo Person::getName();
?>