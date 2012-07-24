<?php
//preg_replace('/^[^.]+(?=\.)/','',$_SERVER['HTTP_HOST'])
session_start();
if($_POST){
	if($_POST['userName'] == 'tonny' && $_POST['userPwd'] == '123'){
		setcookie( "uuid", $_POST['userName'], time() + 86400 * 30, "/", $_SERVER['HTTP_HOST'] );
		$_SESSION['user'] = array('userName' => $_POST['userName'],'ip'=>$_SERVER['REMOTE_ADDR'] ,'pwd'=> $_POST['userPwd'] ,'loginDomain' => $_SERVER['HTTP_HOST']);
		echo 'login successfully!';
		exit();
	}
}else if($_GET){
	setcookie( "uuid", $_GET['userName'], time() + 86400 * 30, "/", $_SERVER['HTTP_HOST'] );
	$_SESSION['user'] = array('userName' => $_GET['userName'],'ip'=>$_SERVER['REMOTE_ADDR'] ,'pwd'=> $_GET['userPwd'] ,'loginDomain' => $_SERVER['HTTP_HOST']);
	if($_GET['callback']){
		echo $_GET['callback'].'('.json_encode($_SESSION['user']).')';
	}
	exit();
}
echo "username or userpwd is wrong!";
?>