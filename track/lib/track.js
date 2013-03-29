(function(global){
	//插桩统计
	var counterData = {};
	function counter(index){
		var cd = counterData[index];
		cd && cd['c']++;
	}
	function addCounter(code_index,line_index,colm_index,code){
		var name = codeIndex+'_'+line_index+'_'+colm_index;
		counterData[name] = {c: 0,code_index: codeIndex,line_index: line_index,colm_index: colm_index,code: code};
		return 'counter("'+name+'")';
	}
	var codeIndex = 1;
	function track(code){
		var ast = JsParse.parse(code);
		code = Process.gen_code(ast,{beautify: true});
		var newCode = [];
		var codeTree = code.split('\n');
		for(var i = 0,j=codeTree.length;i<j;i++){
			var line_code = codeTree[i];
			var line_colm = 0;
			var old_code = line_code.replace(/counter\(\);/g,'');
			line_code = line_code.replace(/counter\(\)/g,function(){
				return addCounter(codeIndex,i,line_colm++,old_code);
			});
			if(line_code == old_code){
				addCounter(codeIndex,i,line_colm++,old_code);
			}
			newCode.push(line_code);
		}
		codeIndex++;
		newCode = newCode.join('\n');
		try{
			new Function(newCode)();
		}catch(e){
			console.log(e);
		}
		return newCode;
	}
	/**输出统计信息*/
	function print(){
		if(typeof console == 'undefined'){
			return;
		}
		var arr = [];
		for(var i in counterData){
			arr.push(counterData[i])
		}
		// arr.sort(function(a,b){
		// 	return a.c > b.c?-1:1;
		// });
		var getInfo = function(num){
			var str = '';
			for(var i = 0;i<num;i++){
				str += '*';
			}
			return num + '\t' + str + '\t\t';
		}
		for(var i = 0,j=arr.length;i<j;i++){
			var item = arr[i];
			console.log(item.code_index+'_'+item.line_index+'_'+item.colm_index+': \t'+getInfo(item.c)+'\t',item.code);
		}
	}

	global.counter = counter;
	global.print = print;
	global.track = track;
})(window);