<?php
include_once("./Person.class.php");
$_Person = Person;
class Person extends $_Person{
	public static function run(){
		echo "I am Man";
	}
}

$person = new Person();
$person->run();
?>