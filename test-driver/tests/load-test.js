//getScript('http://js.zk.com/test-driver/tests/test.js',function(data){debugger;
//	data && data.content && (function(conn){
//		new Function(conn).call(window);
//	})(data.content);
//});

new Function('(function(global){global.calculate = function(){return 1;}})(window)')();
console.log(calculate);
getScript('http://js.zk.com/test-driver/tests/test.js');