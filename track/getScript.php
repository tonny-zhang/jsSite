<?php error_reporting(E_ALL ^ E_NOTICE);?>
<?php
header('Content-Type: application/javascript; charset=utf-8');
$uri = $_GET['uri'];
$callback = $_GET['callback'];
if($uri){
	$scriptContent = file_get_contents($uri);
	//echo $scriptContent;exit();
	//$scriptContent = preg_replace('#(^|[\s]|[^:])//[^\\n\\r]*#', '$1',$scriptContent);
	
	if($callback){
		$scriptContent = preg_replace('/[\n\r]+/','\n',$scriptContent);
		$data['content'] = $scriptContent;
		echo $callback.'('.json_encode($data).')';
	}else{
		echo $scriptContent;
	}
}
?>