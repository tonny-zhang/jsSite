<?php
error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);
$postfix = 'jpg|jpeg|gif|png';
$basePath = 'e:fandongxi/';
$cssPath = $basePath.'css/';
function compress($fileName,$outputFileName){
	$fileConn = file_get_contents($fileName);
	$fileConn = preg_replace('([\r\n\t])','',$fileConn);//过滤换行回车
	$fileConn = preg_replace('/\/\*.+?\*\//','',$fileConn);//去掉注释
	
	$fileConn = preg_replace('/ {2,}/','',$fileConn);//去除多余空格
	$fileConn = preg_replace('/\s*([{}\(\);:,])\s*/','$1',$fileConn);//去掉操作符附近的空格


	$fileConn = preg_replace('/;{2,}/',';',$fileConn);//优化分号
	$fileConn = preg_replace('/;(?=})/','',$fileConn);
	
	$fileConn = preg_replace('/(?<=(?<!\w)0)([a-zA-Z]+)(?=[\s;}])/','',$fileConn);//去掉０的单位

	$fileConn = preg_replace('/\([\'"](.+?)[\'"]\)/','($1)',$fileConn);//去掉引号

	
	$fileConn = preg_replace('/[^{}]+{;?}/','',$fileConn);//去除无效样式

	//$fileConn = preg_replace('/(?<=background|background-image)\s+(?=:)/','',$fileConn);
	//$fileConn = preg_replace('/(?<=:)\s(?=url)/','',$fileConn);
	
	echo $fileConn;
	$outputFileName || $outputFileName = preg_replace('/([^\/\.]+?)\.css/','$1.min.css',$fileName);
	
	$outputFileName && file_put_contents($outputFileName,$fileConn);
	echo $outputFileName.' create success';
	/*
	//提交并合并背景图片
	$preg = '/url\(([^\)]+?\.(jpg|jpeg|gif|png))\)/i';
	preg_match_all($preg,$fileConn,$imgs);
	//print_r($imgs);
	//echo $fileConn;
	
	dealImg($imgs);
	*/
}
function dealImg($imgss){
	if($imgs){
		//得到所有图片数据
		foreach($imgs[1] as $k => $img){
			$img = formateUrl($img);
			$imgIn = getimagesize($img);
			if($imgIn){
				$imgIn['eara'] = $imgIn[0] * $imgIn[1];
				$imgIn['src'] = $img;
				$imgInfo[] = $imgIn;
				$eara[$k] = $imgIn[0] * $imgIn[1];
				$width[$k] = $imgIn[0];
				$height[$k] = $imgIn[1];
			}
		}
		array_multisort($eara,SORT_DESC,$width,SORT_DESC,$height,SORT_DESC,$imgInfo);
		
		$totalHeight = 0;
		foreach($imgInfo as $info){
			$src = $info['src'];
			switch($info[2]){
				case 1:
					$img = imagecreatefromgif($src);
					break;
				case 2:
					$img = imagecreatefromjpeg($src);
					break;
				case 3:
					$img = imagecreatefrompng($src);
					imagesavealpha($img,true);
					break;
				default:
					continue;
			}
			echo $src.'__'.$info['bits']." <br/>";
			$sourceImg[] = array('source'=>$img,'left'=>0,'top'=>$totalHeight,'width'=>$info[0],'height'=>$info[1]);
			
			$totalHeight += $info[1]+2;
		}
		$huabu = imagecreate(1000,10000);
		foreach($sourceImg as $source){
			imagecopy($huabu,$source['source'],$source['left'],$source['top'],0,0,$source['width'],$source['height']);
		}
		imagestring($huabu,5,0,0,'I love you!',imagecolorallocate($huabu, 0, 0, 255));
		imagepng($huabu,'e:jsSite/test.png');
		//imagepng($huabu,'e:test.png');
		//imagedestroy($huabu);
	}
}
function startWidth($str,$withStr){
	return strlen($str) > strlen($withStr) && substr($str,0,strlen($withStr)) == $withStr;
}
function formateUrl($url){
	$basePath = 'e:fandongxi/site/';
	$cssPath = $basePath.'css/';
	if(startWidth($url,'/')){
		return str_replace('//','/',$basePath.$url);
	}
	$url = $cssPath.$url;
	//  a/b/c/../../abc
	while(true){
		$pos = strrpos($url,'..');
		if(!is_bool($pos)){
			$url = preg_replace('/\w+\/\.\.\//','',$url);
		}else{
			break;
		}
	}
	return $url;
}
//echo formateUrl('../img/abc.png');
compress('E:/fandongxi/site/css/app/tecent.css');
//print_r(getimagesize('e:/fandongxi/site/img/feed/icon.png'));
$str = 'order:1px solid #eee;margin-bottom:10px}.event .block-describe{}.event .block-describe .content{position:relative;background:url(/img/event/banner.png)';
$str = preg_replace('/[^{}]+{;?}/','',$str);
//echo $str;
?>
<img src="/test.png"/>