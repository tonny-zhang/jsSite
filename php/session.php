<?php
session_start();
$_SESSION['name'] = 'test';
var_dump($_SESSION);
?>