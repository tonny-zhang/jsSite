<?php
echo 'begin';
print_r($_POST);
if ($_POST && function_exists('curl_init')) {
	// Use CURL if installed...
	/*$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "http://www.fan.com/user/login.fan");
	curl_setopt($ch,CURLOPT_POST,1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, array(
			'username'=>'yuehei@vip.qq.com',
			'password'=>'123456',
			'remember'=>1,
			'to'=>'/my.fan'));
	$result = curl_exec($ch);
	echo $result;
	curl_close($ch);*/
	//file_put_contents('d:test.html',file_get_contents('http://www.fan.com/user/level/ajax/upgrade.fan'));
//{"name":"06daf5efbf84c3a868b3b7ec8aa72161","time":1334564203,"imagefile":"@D:\\images\\temp\\06daf5efbf84c3a868b3b7ec8aa72161.jpg"}
	$curl = curl_init();
	curl_setopt( $curl, CURLOPT_URL, 'http://upload.fan.com/?mod=img.show' );
	curl_setopt( $curl, CURLOPT_POST, 1 );
	curl_setopt( $curl, CURLOPT_POSTFIELDS,array("name"=>"06daf5efbf84c3a868b3b7ec8aa72161","time"=>1334564203,"imagefile"=>"@D://images//temp//06daf5efbf84c3a868b3b7ec8aa72161.jpg"));
	curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl, CURLOPT_USERAGENT, "Mozilla/4.0" );

	$result = curl_exec( $curl );
	var_dump( $result );
}else{
	echo "no support curl";
}
new Imagick('D:\a.jpg')
?>
<form action="http://www.fan.com/show/ajax/upload.fan" method="post">
	<input type="file" name="imagefile"/>
	<input type="submit" name="sb" value="submit"/>
</form>