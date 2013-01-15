<?php error_reporting(E_ALL ^ E_NOTICE);?>
<?php echo '_'.intval($abc).'_';?>
<?php
     $arr = array(1,2,3);
    foreach($arr as &$val) {
        $val += $val % 2 ? $val++ : $val--;
    }
    $val = 0;
    print(join('',$arr));
?>
<?php
$arr = array(
	array(
		'id' => '20121130'
	),
	array(
		'id' => '20121230'
	),
	array(
		'id' => '20121106'
	),
	array(
		'id' => '20121110'
	),
);
$id = '20121112';
$newArray = array_filter($arr,function($a){
	global $id;
			return strcmp($a['id'],$id) < 0;
		});
var_dump($newArray);exit();
$one = array(1);
$two = array('name'=>array('test'),'val'=>array('abc'),'abc'=>array('123'));
$one = array_slice($two,1,2);
var_dump($one);exit();
echo preg_replace('/（[^）]+）/','','123（@魏什么- ）test');exit();
echo 10100%10000;exit();
echo preg_replace('/^;|;$/','',';test=123;');exit();
$result = getimagesize('E:\fdx_git\fandongxi\site\img2\interview\20121130\53_10.png');
var_dump($result);exit();
echo (float)123456789123456;exit();
phpinfo();exit();
var_dump( explode('/','/data/log/www-mysql-error/'));
echo microtime().'<br/>';
echo microtime(true).'<br/>';
$str = '13我们来自不同一的';$mark = '234-_-';
echo strtr($mark, '-_', '+').'<br/>';
echo hash_hmac("sha1", $str, strtr($mark, '-_', '+/')).'<br/>';
echo hash_hmac("sha1", $str , strtr($mark, '-_', '+/'), true).'<br/>';exit();
var_dump(explode(',',null));exit();
var_dump( unserialize('a:4:{i:1;a:4:{s:4:"name";s:12:"出街热款";s:10:"image_name";s:32:"86c2f2fff62134000acdb74d2b53846c";s:10:"image_time";s:10:"1336737160";s:3:"tag";a:9:{i:0;s:4:"2203";i:1;s:4:"2393";i:2;s:4:"2579";i:3;s:4:"2049";i:4;s:4:"2204";i:5;s:4:"2383";i:6;s:4:"2391";i:7;s:4:"2381";i:8;s:4:"2631";}}i:2;a:4:{s:4:"name";s:12:"服饰搭配";s:10:"image_name";s:32:"45409bfc1eb0ccc56f1e2370bb5a5cec";s:10:"image_time";s:10:"1336737311";s:3:"tag";a:9:{i:0;s:4:"2051";i:1;s:4:"2054";i:2;s:4:"2202";i:3;s:4:"2192";i:4;s:4:"2387";i:5;s:4:"2056";i:6;s:4:"2053";i:7;s:4:"2580";i:8;s:4:"2052";}}i:3;a:4:{s:4:"name";s:9:"首饰盒";s:10:"image_name";s:32:"8ef03761b383f77fe5f39186e99e0056";s:10:"image_time";s:10:"1336737322";s:3:"tag";a:9:{i:0;s:4:"2585";i:1;s:4:"2205";i:2;s:4:"2534";i:3;s:4:"2389";i:4;s:4:"2535";i:5;s:4:"2533";i:6;s:4:"2392";i:7;s:4:"2386";i:8;s:4:"2378";}}i:4;a:4:{s:4:"name";s:12:"热门风格";s:10:"image_name";s:32:"e639d8ff685d201a29370e3cc4cb5cef";s:10:"image_time";s:10:"1336734932";s:3:"tag";a:9:{i:0;s:4:"2095";i:1;s:4:"2097";i:2;s:4:"2427";i:3;s:4:"2273";i:4;s:4:"2420";i:5;s:4:"2544";i:6;s:4:"2153";i:7;s:4:"2613";i:8;s:4:"2213";}}}'));
echo '-朝阳区 -'.trim('朝阳区 ').'-';
$str = '上海黄浦区南京西路338号1406室';
echo '上海市黄浦区'.preg_replace('/^(上海(市)?)?黄浦区/', '', $str);
$reg = '/((.+?)[省市](.+?)[区县市])/';
$reg = '/[\u4e00-\u9fa5]/';
$str = '河北省石家庄市河北省石家庄';
preg_match($reg,$str,$arr);
var_dump($arr);
echo '-----';
echo preg_replace($reg,'',$str);
echo '-----';
echo preg_replace('/((.+?)[省市]?(.+)?[区县市]?)\2[省市]?\3[区县市]?/','$1','河北省石家庄市河北省石家庄');
sleep(3);
echo '<html>
	<body>
		123
	</body>
</html>';
?>


<meta charset="utf-8"/>
<?php
$arr = array("_1","_2",3,4);
var_dump(str_replace('_','--',$arr));

$a = '123';
$b = 'abc';
var_dump(array_unshift($a,$b));

var_dump(01090); // 八进制 010 = 十进制 8

echo '<br/>';
$a = 'test';
$b = $a;
$c = & $a;
//unset($a);
$a = '123';
var_dump($b);
var_dump($c);
echo '<br/>---------';
?>

<script language="php">
$php_in_script = 'php_in_script';
        echo $php_in_script.' some editors (like FrontPage) don\'t
              like processing instructions';
</script>

<?php echo 1?1:''?>
<?php
$a = array('aa'=>'val');
$b = array('test'=>'$a["aa"]','one'=>'a');
$c = $$b['one'];
print_r($c['aa']);
echo "<br/>--<br/>";
$d = $$b['test'];
print_r($d);
echo "<br/>--<br/>";
?>
<?php
/*print_r($_SERVER);
$str = 'a,b';
$arr = explode(',',$str);
echo count($arr);
print_r($arr);
foreach($arr as $v){
	echo $v.'a<br/>';
}
$arr = array("a"=>"test");
print_r($arr);
echo array_shift($arr);*/
?>
<?php print_r($_REQUEST)?>
<form method="POST">
	<button name="del" value="sina" type="submit">取消绑定</button>
</form>
<?php 
function unicode2utf8($str){
        if(!$str) return $str;
        $decode = json_decode($str);
        if($decode) return $decode;
        $str = '["' . $str . '"]';
        $decode = json_decode($str);
        if(count($decode) == 1){
                return $decode[0];
        }
        return $str;
}
$result = json_encode( array( 'status' => '404', 'info' => '不是图片或图片文件损坏' ) );
echo unicode2utf8('\''.$result.'\'');
echo preg_replace('/,$/','__','abc,test,');
?>