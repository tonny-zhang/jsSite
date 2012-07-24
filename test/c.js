define(function(req){
	/*
	//这里阻塞了页面的渲染
	var c = new Date().getTime();
	while(true){
		if(new Date().getTime()-c >= 3000)
			break;
	}*/
	createDIV('I\' in module c');
	return {
		'show' : function(){
			createDIV('I\' in module c show');
		}
	}
});