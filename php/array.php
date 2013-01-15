<?php
$arr = array();
$arr[] = 1;
$arr[] = 2;
$arr[] = 3;
echo json_encode($arr);	//[1,2,3]
unset($arr[1]);
echo json_encode($arr);	//{"0":1,"2":3}		//NOTICE:这里数组键值已经不是连续的，这时键值当成字符串解析，最后转成了Object
array_unshift($arr,11);
echo json_encode($arr);	//[11,1,3]
exit();

if($_GET['callback']){
	echo $_GET['callback'].'("http://www.baidu.com")';
}
exit();
?>

<?php echo time()?>
<a href="otherCommit.php">go to otherCommit.php</a>
<form action="http://js.zk.com/php/otherCommit.php" method="POST">
	<input id="test" type="submit" value="go to other"/>
</form>

<script>
	document.getElementById('test').onclick = function(){
		this.value='init';
		this.disabled = true;
	}
</script>
<?php
$arr = array('item'=>array());
if($arr && isset($arr['id'])){
	echo 'yes'.count($arr);
}else{
	echo 'no';
}
exit();
$arr = array(1,3,4);
array_splice($arr,1,1);
var_dump($arr);
exit();
$arr = array('image'=>'test');
echo empty($arr[count($arr)-1]);
try{
	$arr[count($arr)-1];
}catch(Exception $e){
	var_dump('I catch ',$e);
}
$a = 'test';
$b = $a;
$a = $a.'abc';
echo $a.'<br/>'.$b;
//error_log(var_export(array(123),true),3,'e:/test.txt');
echo '---'.md5(123).'---';
$b = array('name1'=>'test');
$a = isset($b['name'])?$b['name']:123;

$arr = array(array(array(1),array(2)),array(array(111),array(2222)));
$arr = array(1,2,3,4,5,6,7);
foreach($arr as $k=>$v){
	if($v == 2){
		unset($arr[$k]);
	}
}
//var_dump(array_splice($arr,-5,5));
var_dump($arr);exit();
$arr1 = array(array(11),array(22),array(33));
foreach($arr as &$v){
	$a = array_splice($arr1,0,1);var_dump($a[0],$arr1);exit();
	array_push($v,$a);
}
unset($v);
var_dump($arr);
echo '<br/>';
var_dump($arr1);
exit();
var_dump(is_array(array()));
$d = array(
		array('id'=>1,'url'=>'http://www.fandongxi.com','content'=>'test1','img'=>'http://img.fandongxi.com/f/EAwMCEJXVxEVH0hKVgwZFxoZFxscFlYbFxVXGhkXVw0IFBcZHB0cVxFKVyxJOj8VMSASFAIgIBoaHR0bISdISk1ATEtWEggf/220.jpg'),
		array('id'=>12,'url'=>'http://www.fandongxi.com','content'=>'test2','img'=>'http://img.fandongxi.com/f/EAwMCEJXVxEVH0hKVgwZFxoZFxscFlYbFxVXGhkXVw0IFBcZHB0cVxFKVyxJOj8VMSASFAIgIBoaHR0bISdISk1ATEtWEggf/220.jpg'),
		array('id'=>13,'url'=>'http://www.fandongxi.com','content'=>'test3','img'=>'http://img.fandongxi.com/f/EAwMCEJXVxEVH0hKVgwZFxoZFxscFlYbFxVXGhkXVw0IFBcZHB0cVxFKVyxJOj8VMSASFAIgIBoaHR0bISdISk1ATEtWEggf/220.jpg'),
		array('id'=>14,'url'=>'http://www.fandongxi.com','content'=>'test4','img'=>'http://img.fandongxi.com/f/EAwMCEJXVxEVH0hKVgwZFxoZFxscFlYbFxVXGhkXVw0IFBcZHB0cVxFKVyxJOj8VMSASFAIgIBoaHR0bISdISk1ATEtWEggf/220.jpg'),
		array('id'=>15,'url'=>'http://www.fandongxi.com','content'=>'test5','img'=>'http://img.fandongxi.com/f/EAwMCEJXVxEVH0hKVgwZFxoZFxscFlYbFxVXGhkXVw0IFBcZHB0cVxFKVyxJOj8VMSASFAIgIBoaHR0bISdISk1ATEtWEggf/220.jpg'),
	);
$p = 1;
$data = array_slice($d,$p*3,2);
var_dump($data);
$arr = array(
	array('name'=>'one'),
	array('name'=>'two'),
);
foreach($arr as $k=>$v){
	//$v['name'] = $v['name'].'__';
	$arr[$k]['name'] = $v['name'].'__';
}
var_dump($arr);
$link = mysqli_connect("localhost", "root", "");
$str = "t'est";
if (get_magic_quotes_gpc()){
	echo 'abc';
	$str = stripslashes($str);
}
echo '<br/>';
echo mysqli_real_escape_string($link,$str);
class Person{
	public $name = 'test';
	function run(){
		echo __CLASS__.$this->name;
	}
}
$person = new Person();
$person->run();
$str = 'test/csdfas.css,asdf.css,a.css,a.css,';
echo implode(',',array_unique(split(',',$str)));
?>