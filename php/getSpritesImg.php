<?php
$imgFiles = array();
function tree($directory){
	GLOBAL $imgFiles;
	$mydir=dir($directory);
	while($file=$mydir->read()){
		if((is_dir("$directory/$file")) AND ($file!=".") AND ($file!="..")){
			//echo "$file<br/>";
			tree("$directory/$file");
		}else{
			//echo "$file<br/>";
			if(preg_match('/\.(jpg|gif|png)$/',$file)){
				array_push($imgFiles,'file:///'.$directory.'/'.$file);
			}
		}
		//echo "<br/>";
	}
	$mydir->close();
}
tree("E:/fdx_git/fandongxi/site/img2/face/");
echo 'var imgs = '.json_encode($imgFiles);
?>