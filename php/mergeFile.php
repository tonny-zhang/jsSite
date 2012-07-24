<?php
	echo realpath(__FILE__);
	function mergeFile($path,$newFileName){
		$dir = opendir($path);
		$conn = '';
		while(($file = readdir($dir)) !== false){
			$file = $path.$file;
			if(is_file($file)){
				$info = pathinfo($file);
				if($info['extension'] == 'js'){
					$conn .= file_get_contents($file);
				}
			}
		}
		return file_put_contents($newFileName,$conn);
	}
	
	$path = 'D:/GC/';
	mergeFile($path,$path.'new2.js');
?>