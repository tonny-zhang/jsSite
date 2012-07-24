<?php
print_r($_SERVER);
session_start();
if(isset($_REQUEST['method'])){
	if(isset($_SESSION['user'])){
		exit();
	}
	setcookie( "uuid", $_REQUEST['userName'], time() + 86400 * 30, "/", $_SERVER['HTTP_HOST'] );
	$_SESSION['user'] = array('userName' => $_REQUEST['userName'],'ip'=>$_SERVER['REMOTE_ADDR'] ,'pwd'=> $_POST['userPwd'] ,'loginDomain' => $_SERVER['HTTP_HOST']);
	echo 'alert(123)';
	exit();
}
if(isset($_COOKIE['uuid'])){
	$userName = $_COOKIE['uuid'];
	if(isset($_SESSION['user'])){
		if(isset($_REQUEST['callback'])){
			echo $_REQUEST['callback'].'('.json_encode($_SESSION['user']).',"'.$_SERVER['HTTP_HOST'].'")';
			exit();
		}
	}
}
echo 'alert("no login at '.$_SERVER['HTTP_HOST'].'");';
?>