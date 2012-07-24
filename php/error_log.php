<?php
	error_log('log14',3,'/test.log');
	error_log(var_export(array('test',__FILE__,__CLASS__),true),3,'/test.log');
?>