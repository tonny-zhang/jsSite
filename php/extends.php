<?php
class Person{
	public $name;
	public function __construct($name){
		$this->name = $name;
	}
	public function say(){
		echo 'My name is '.$this->name;
	}
}
class Man extends Person{
	public function __construct(){
		parent::__construct("man");
	}
}
$man = new Man();
$man->say();
?>