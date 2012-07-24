/**
suggest.php
<?php
error_reporting (E_ALL ^ E_NOTICE);
$jsondata = "{symbol:'".$_GET['symbol']."', price:".$_GET['price']."}";
echo $_GET['callback'].'('.$jsondata.')';
?>
test.html
getJSON('http://yourdomain.com/jsonp/suggest.php?symbol=test&price=120',function(d){
	alert(d.symbol+'\' price is '+d.price);
},true);
*/
/**
url			:	请求地址
callback	:	回调函数
isCache		:	是否进行缓存，默认为false
*/
function getJSON(url,callback,isCache){
	if(!url)return;
	isCache = typeof isCache == 'undefined' || !!isCache;//是否进行缓存，默认false
	
	var tt = window['fun_index']?++window['fun_index']:1;
	window['fun_index'] = tt;

	var loadScript = document.createElement('script');
	document.getElementsByTagName('head')[0].appendChild(loadScript);
	loadScript.id = 'js_'+tt;

	if(callback){
		var cb = 'callback=';
		if(typeof callback == 'function'){
			var fN = 'fun_' + tt;
			window[fN] = function(d){//生成零时函数			
				loadScript = document.getElementById('js_'+tt);//重新根据ID得到script对象
				
				window[fN] = null;
				try {
					if (loadScript.clearAttributes) {
						loadScript.clearAttributes();
					}else {
						for (var p in loadScript) delete loadScript[p];
					}
				} catch (x) {alert("error:");}
				loadScript.parentNode.removeChild(loadScript);//将script标签删除
				
				callback(d);//调用自定义回调函数
			};
			cb += fN;
		}else{
			cb += callback;
		}
		url += (~url.indexOf('?')?'&':'?') + cb+(isCache?'':'&r='+Math.random());//生成新的ＵＲＬ
	}
	loadScript.src = url;
}