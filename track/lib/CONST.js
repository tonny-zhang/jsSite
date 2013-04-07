(function(global){
	var GLOBAL_FLAG = 'track_';//+(+new Date())+'_';
	global.trackFlag = {
		 BLOCK: 'block'//块标识
		,VAR: 'var'//变量申明
		,LOGIC_AMD: 'and'//逻辑&&
		,LOGIC_OR : 'or'//逻辑||
		,EXPRESS_STATEMENT: 'statement'
		,CASE: 'case'
	};

	for(var i in global.trackFlag){
		global.trackFlag[i] = GLOBAL_FLAG + global.trackFlag[i];
	}
})(this);