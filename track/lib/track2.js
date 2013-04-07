(function(global){
	// var tracker = {};
	var counter = {};
	var reg = {};
	for(var i in trackFlag){
		reg[i] = new RegExp(trackFlag[i],'g');
		global[trackFlag[i]] = function(index){
			counter[index]++;
			return true;
		}
	}
	//global.tracker = tracker;
	global.counter = counter;
	var Code = function(code){
		this.code = code;
	}
	var codeProp = Code.prototype;
	codeProp.getExecuteCode = function(){
		var getParam = function(){
			counter[index] = 0;
			return '('+(index++)+')';
		}
		var index = 0;
		var code = this.code;
		code = code.replace(reg.BLOCK,function(){
			return trackFlag.BLOCK + getParam() + ';';
		}).replace(reg.VAR,function(){
			return 'temp='+trackFlag.VAR + getParam();
		}).replace(reg.LOGIC_AMD,function(){
			return '&&'+trackFlag.LOGIC_AMD + getParam();
		}).replace(reg.LOGIC_OR,function(){
			return '&&'+trackFlag.LOGIC_AMD + getParam();
		}).replace(reg.EXPRESS_STATEMENT,function(){
			return trackFlag.EXPRESS_STATEMENT + getParam() + ';';
		}).replace(reg.CASE,function(){
			return trackFlag.CASE + getParam();
		});
		code = '(function(){var temp;'+code+'})(window)'
		return code;
	}
	//整个代码的覆盖率
	//条件执行覆盖率
	//执行频率
	codeProp.getResult = function(){

	}
	global.Code = Code;
})(this);