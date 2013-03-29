<?php
echo preg_replace(">test>", '__', 'abctestasdftest');exit();

/**
	* 压缩HTML
	* @access private
	* @return void
	*/
	function _HtmlCompress($content){
		//处理页面上的javascript,后期可以考虑压缩
		if(preg_match_all('#<script(\s+type="text/javascript"\s*)?>([\s\S]*?)</script>#',$content,$arr)){
			foreach($arr[0] as $v){
				//处理js里的<!-- //-->
				$vv = preg_replace('#<!--\s*([\s\S]*?)\s*(//)?-->#', '$1',$v);
				//处理单行注释
				$vv = preg_replace('#(^|[\s]|[^:])//[^\n\r]*#', '$1',$vv);
				//处理多行注释
				$vv = preg_replace('#/\*[\s\S]*?\* /#', '',$vv);
				//处理右括号后分号，防止两个语句在同一行出现错误，闭包函数括号处理
				//这里的右括号
				$vv = preg_replace('#\)\s*[\n\r]+\s*([_$a-zA-Z(])#',');$1',$vv);
				//替换处理完的js代码
				$content = str_replace($v,$vv,$content);
				var_dump( (exec('node E:/nodejsSite/uglifyJS_compress/compressCode.js js '.$arr[1])));exit();
			}
			
			$content = preg_replace('#<script(\s+type="text/javascript"\s*)?>([\s]*?)</script>#','',$content);
		}
		//处理回车换行置制表位
		$content = preg_replace('/[\n\r\t]/', '', $content);
		//过滤两个以上空白
		$content = preg_replace('/(\s){2,}/','',$content);
		//过滤html注释,注释当中不可以有">"
		$content = preg_replace('#<!--[^>]*?(?<!<!\[endif\])-->#','',$content);
		//处理php标识
		$content = preg_replace('/<\?php/i','$0 ', $content);
		return $content;
	}


//echo preg_replace('#<!--\s*([\s\S]*?)\s*(//)?-->#', '$1','<!--     testabc //-->');

$str = '<script>
<!--
var misc_url = "http://misc.fan.com/img2";


(function() {
	
			var frontDomain="http://misc.fan.com/min/f=/js/modules/";
		
	seajs.config({base:frontDomain,charset:"utf-8",version:"20101020",isDebug:false});
})();
//-->

//test
<?php
test()
{

}
abc
?>
(function(){})()
$("#id").click(function(){

})
.back()
  .abc();
test

(function() {
	
			var frontDomain="http://misc.fan.com/min/f=/js/modules/";
		
})();
test()abc;
if(j_form.attr("bindevent");)return false;
</script>
<script type="text/javascript"><!--testabc;//-->
</script>
<script type="text/javascript"><!-- if(true){console.log(123);}--></script>
<!--[if lt IE 7]> <html class="ie6" lang="zh-CN"> <![endif]--><!--[if IE 7]><html class="ie7" lang="zh-CN"> <![endif]-->
<!-- 热门风格 end -->
<!--abc-->
<!-- 类别导航 END --><!--如果第四列为热门风格--><!--如果第四列为热门风格 end--><!-- 类别导航 END --><!-- 热门风格 --><div class="nav_hot" stat="square_filter_default_1"><h2 class="c_pink">相关品牌</h2><ul class="clearfix imglogo"><li><a href="/square.fan?n=default&bid=1623"><img src="http://img.fan.com/c/icon/brand/150_150/zara/50.jpg" title="ZARA"></a></li><li><a href="/square.fan?n=default&bid=1695"><img src="http://img.fan.com/50.jpg" title="HM"></a></li><li><a href="/square.fan?n=default&bid=2239"><img src="" title="轻松熊"></a></li></ul><h2 class="c_pink">热门风格</h2><ul class="clearfix text" ><li><a href="/square.fan?n=default&w=%E6%AC%A7%E7%BE%8E">欧美</a></li><li><a href="/square.fan?n=default&w=%E7%99%BE%E6%90%AD">百搭</a></li><li><a href="/square.fan?n=default&w=%E7%94%9C%E7%BE%8E">甜美</a></li><li><a href="/square.fan?n=default&w=%E6%97%A5%E7%B3%BB">日系</a></li><li><a href="/square.fan?n=default&w=%E8%A1%97%E5%A4%B4">街头</a></li><li><a href="/square.fan?n=default&w=%E6%B7%B7%E6%90%AD">混搭</a></li><li><a href="/square.fan?n=default&w=%E5%8F%AF%E7%88%B1">可爱</a></li><li><a href="/square.fan?n=default&w=%E7%AE%80%E7%BA%A6">简约</a></li><li><a href="/square.fan?n=default&w=%E5%90%8D%E5%AA%9B">名媛</a></li></ul></div><!-- 热门风格 end -->

<!DOCTYPE html><!--[if lt IE 7]> <html class="ie6" lang="zh-CN"> <![endif]--><!--[if IE 7]><html class="ie7" lang="zh-CN"> <![endif]--><!--[if IE 8]><html class="ie8" lang="zh-CN"> <![endif]--><!--[if gt IE 8]><!--><html> <!--<![endif]--><head><meta charset="utf-8"><title>翻乐送，天天免费送不停-翻东西</title>
<!-- 热门风格 end -->test
';
$str = 'test()
(function(){

})()


(function(fn){

})


(function(){
	test();
	(function(){})();
})
abc();';
$str = 'body{
	font-size:15px
	font-weight:bold;
	color:
	#ccc;
}';
echo preg_replace('#[\w-](?=[\r\n])#', '$0;',$str);
exit();
$str = 'ababababccccdd(d)
ddd

test';
echo  preg_replace('#((?<!\))\r\n)+#', '_',$str);echo '----';
echo  preg_replace('#((?<![)\r])\n)+#', '=',$str);echo '----';
echo  preg_replace('#((?<!\))\r)+#', '=',$str);
exit();
//echo  preg_replace('#((?<!\))[\r\n])+#', '$1',$str);
echo  preg_replace('#(ab)+#', '$1',$str);echo '----';
echo  preg_replace('#(c)+#', '$1',$str);echo '----';
echo  preg_replace('#(d)+#', '$1',$str);
exit();
//$str = "<script type=\"text/javascript\"><!--var misc_url = 'http://misc.fan.com/img2';(function() {    var frontDomain='http://misc.fan.com/min/f=/js/modules/'; seajs.config({base:frontDomain,charset:'utf-8',version:'20101020',isDebug:false});})();//--></script>";

echo preg_replace('#\)\s*[\n\r]*\s*([_$a-zA-Z]|\((?))#',');$1',$str);
exit();

if(preg_match_all('#<script(\s+type="text/javascript"\s*)?>([\s\S]*?)</script>#',$str,$arr)){
	
	foreach($arr[2] as $v){
		$vv = preg_replace('#<!--([\s\S]*?)(//)?-->#', '$1',$v);
		$vv = preg_replace('#(^|[\s]|[^:])//[^\n\r]*#', '$1',$vv);
		$vv = preg_replace('#/\*[\s\S]*?\*/#', '',$vv);
		if(preg_match_all('#<\?php[\s\S]*?\?>#',$vv,$phpArr)){
			foreach($phpArr[0] as $k => $v_php){
				$vv = str_replace($v_php,'$_'.$k.'_$',$vv);
			}
		}
		$vv = preg_replace('#\)\s*[\n\r]*\s*#',')',$vv);
		//$vv = preg_replace('#(?<=_$nnn$)\s+#','',$vv);
		//$vv = preg_replace('#\)([^.(;{])#', ');$1',$vv);
		//$vv = preg_replace('#\)([_$a-zA-Z])#', ');$1',$vv);
		$vv = preg_replace('#\)\s*[\n\r]*\s*([_$a-zA-Z])#',');$1',$vv);
		if(!empty($phpArr)){
			foreach($phpArr[0] as $k => $v_php){
				$vv = str_replace('$_'.$k.'_$',$v_php,$vv);
			}
		}
		echo '++++'.$vv.'+++';
		$str = str_replace($v,$vv,$str);
	}
	$str = preg_replace('#<script(\s+type="text/javascript"\s*)?>([\s]*?)</script>#','',$str);
}
echo '<br/><br/><br/><br/>

---------------begin--------------------

';
echo '---'.$str.'----';
echo '
---------------begin1--------------------

';
//$str = preg_replace('#(<!--)((?!\[if[^>]+?\]>(?!<!-->)))[\s\S]*?((?<!\[endif\])|(?<!<!))-->#','',$str);
//$str = preg_replace('#<!--(?!=\[if).*?(?<!=<![endif])-->#','',$str);
$str = preg_replace('#<!--[^>]*?(?<!<!\[endif\])-->#','',$str);

echo '====---'.$str.'----====';
exit();

$str = "<?phpif ( !defined( 'IN_NTP' ) ) exit( 'Access Denied' ); ?><?phpif()?><?phpecho abc;?>";
//$str = str_replace('<?php','<?php ',$str);
$str = preg_replace('/<\?php/i','$0 ',$str);
echo $str;
echo '<br/>';

$str =  '<script type="text/javascript"><!-- if(true){console.log(123);}--></script>';
echo preg_replace('#((?<=<script>)|(?<=<script type="text/javascript">))\s*<!--\s*(.*?)\s*-->\s*(?=</script>)#','$2',$str);
exit();
echo '<br/>\n';
$str = '//test abc
//test
abc//test
if(ture){//test
http://www.baiduc.com
/**
//test
test
*/
abc';
$str = preg_replace('/(^|[\s]|[^:])\/\/[^\n\r]*/', '$1',$str);
//echo $str;
echo '<br/>\n';
echo preg_replace('#/\*[\s\S]*?\*/#', '',$str);