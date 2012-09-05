<?php
header('cache-control: private');
header('Content-Type: text/html; charset=utf-8');
//测试设置30秒超时，一般会设置比较长时间。 
set_time_limit(30);
//这一行是为了搞定IE这个BT 
echo str_repeat(' ', 256);
ob_flush();
flush();
$fp = new SplFileObject('./chat.txt', 'r+');
$line = 0;
$totalLine = 0;
while (!$fp -> eof()) {
	$fp -> current();
	$totalLine++;
	$fp -> next();
}
$fp -> seek($totalLine);
$i = $totalLine - 1;
while (true) {
	if (!$fp -> eof()) {
		if ($content = trim($fp -> current())) {
			echo '<div>';
			echo htmlspecialchars($content);
			echo "</div>";
			flush();
			$fp -> next();
			$i++;
		}
	} else {
		$fp -> seek($i - 1);
		$fp -> next();
	} {
		//这里可以添加心跳检测后退出循环 
		break;
	}
	usleep(1000);
} ?>