<?php
require('./TopClient.php');
require('./TaobaokeItemsDetailGetRequest.php');
require('./RequestCheckUtil.php');
require('./Logger.php');
$c = new TopClient;
$c->appkey = '12145346';
$c->secretKey = 'c91304577b06fc944599899a0761d418';
$req = new TaobaokeItemsDetailGetRequest();
$req->setFields("num_iid,detail_url");
$req->setNick("·­¶«Î÷_2010");
$req->setPid(123456);
$req->setNumIids("1,2,3");
$req->setTrackIids("value1,value2,value3");
$req->setOuterCode("abc");
$req->setIsMobile("false");
$resp = $c->execute($req);
var_dump($resp);
?>