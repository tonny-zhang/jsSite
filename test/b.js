define(function(req){
	req('c.js',function(c){
		c.show();
	});
	createDIV('I\' in module b');
	return function(){
		createDiv('this is in module b return');
	}
});