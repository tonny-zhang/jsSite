//getScript('http://js.zk.com/test-driver/src/arithmetic-stack.js',function(content){
//	
//	getScript('http://js.zk.com/test-driver/tests/arithmetic.js',function(c){
//		content = track(content);
//		
//		//console.log(content+'\n'+c);
//		var fn = Function.apply(window,[content+'\n'+c]);
//		fn();
//		new Function('console.log("---",calculate);')();
//		print();
//	})
//	//console.log(content);
//	//document.getElementById('result_source').value = content;
//})
(function(global){
	seajs.use(['http://js.zk.com/track/lib/parse-js.js','http://js.zk.com/track/lib/track.js'],function(){
		seajs.use('http://js.zk.com/track/lib/process.js',function(){
			getScript('http://js.zk.com/test-driver/src/arithmetic-stack.js',function(content){
				console.log(content);
				content = track(content);
				getScript.call({noCache: true},'http://js.zk.com/test-driver/tests/arithmetic.js');
//				seajs.use('http://js.zk.com/test-driver/tests/arithmetic.js',function(){
//					//console.log(calculate);
//					print();
//				});
			})
		});
	});
})(window);
