<?php  
 $m = new Mongo('mongodb://10.10.212.108:27017');      //这里采用默认连接本机的27017端口，当然你也可以连接远程主机如                   192.168.0.4:27017,如果端口是27017，端口可以省略  
  
$db = $m -> comedy;             // 选择comedy数据库，如果以前没该数据库会自动创建，也可以用$m->selectDB("comedy");  
  
$collection = $db->collection;  //选择comedy里面的collection集合，相当于RDBMS里面的表，也-可以使用  
$db->selectCollection("collection");  
/*********添加一个元素**************/  
$obj = array( "title" => "Calvin and Hobbes", "author" => "Bill Watterson" );  
  
$collection->insert($obj);     //将$obj 添加到$collection 集合中  
  
/*********添加另一个元素**************/  
$obj = array( "title" => "XKCD", "online" => true );  
$collection->insert($obj);  
$cursor = $collection->find();  
  
foreach ($cursor as $obj) {    //遍历所有集合中的文档  
	var_dump($obj);
}  
  
  
$m->close();          //断开MongoDB连接  
?>