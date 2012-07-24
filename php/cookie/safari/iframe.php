<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!--[if lt ie 7]> <html class="ie ie6" lang="zh-CN"> <![endif]-->
<!--[if ie 7]>    <html class="ie ie7" lang="zh-CN"> <![endif]-->
<!--[if ie 8]>    <html class="ie ie8" lang="zh-CN"> <![endif]-->
<!--[if gt ie 8]><!-->  <html> <!--<![endif]-->
 <head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<!--[if lt ie 7]> <title>IE 7 以下版本</title> <![endif]-->
<!--[if ie 7]> <title>IE 7</title> <![endif]-->
<!--[if ie 8]> <title>IE 8</title> <![endif]-->
<!--[if gt ie 8]><title>IE 8 以上版本</title><![endif]-->
		<meta name="Generator" content="EditPlus"/>
		<meta name="Author" content=""/>
		<meta name="Keywords" content=""/>
		<meta name="Description" content=""/>
	</head>

	<body>
	<?php
	var_dump($_COOKIE);
?>
	<?php if(empty($_COOKIE['test'])):?>
abc
<script type="text/javascript">
<!--
	window.open('/php/cookie/safari/setCookie.php','newwindow','height=100,width=100,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
//-->
</script>
<?php endif?>
	</body>
</html>
