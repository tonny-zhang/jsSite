<?php
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