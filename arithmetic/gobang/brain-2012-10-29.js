/*智能计算->博弈树*/
function Brain(data,player){
	var _this = this;
	_this.depth = 4;//检查树深度
	//_this.board = board;
	_this.data = data;
	_this.currentPlayer = player;
}
/*
[
	[{x:1,y:2,cpu:1,user:2}],
	[{x:1,y:2,cpu:1,user:2}],
]
*/
(function(){
	function togglePlayer(player){
		return player == PLAYER_WHITE?PLAYER_BLACK:PLAYER_WHITE;
	}
	//data为没有下子之前的数据
	function Node(x,y,parentNode){
		this.pos = {x:x,y:y};
		this.parentNode = parentNode;
		this.data = copyArrayDepth(parentNode.data);
		
		this.depth = parentNode.depth;
		this.level = parentNode.level+1;
		this.player = togglePlayer(parentNode.player);
		
		this.childNodes = [];
		if(parentNode.level > 0){
			this.putChess();
		}
		this.value = this.getValue();
		this.getChildNodes();
		//delete this.data
	}
	var propNode = Node.prototype;
		
	/*在父级节点基础上下棋*/
	propNode.putChess = function(){
		var pos = this.pos;
		this.data[pos.x][pos.y] = this.player;
	}
	/*修复父级value*/
	propNode.fixedParentValue = function(){
		if(this.value > this.parentNode.value){
			console.log('fixedValue:',this.parentNode.value,'->',this.value,this.player,this.data);
			this.parentNode.value = this.value;
			this.parentNode.fixedParentValue();
		}
	}
	propNode.search = function(parentValue){
		for(var c = this.childNodes,len = c.length,i=0;i<len;i++){
			c[i].fixedParentValue();
		}
	}
	/*贪婪追堵*/
	propNode.greed = function(){
		return [2,3]
	}
	/*给当前节点打分*/
	propNode.getValue = function(){
		var p = this.player,
			d = this.data,
			bs = d.length,
			pos = this.pos,
			x = pos.x,
			y = pos.y;
		function f(step_x,step_y){
			var _x = step_x + x,
				_y = step_y + y,
				_result = 0;
			for(var i = 0;i<4 && _x >= 0 && _x < bs && _y >= 0 && _y < bs;i++,_x = step_x + x,_y = step_y + y){
				if(d[_x][_y] == p){
					_result ++ ;
				}else{
					break;
				}
			}
			return _result;
		}
		return 1 + f(-1,-1) + f(1,1) + f(1,-1) + f(-1,1) + f(-1,0) + f(1,0) + f(0,-1) + f(0,1);
	}
	/*生成子节点*/
	propNode.getChildNodes = function(){
		if(this.level > this.depth){
			return;
		}
		for(var d=this.data,i =0,len=d.length;i<len;i++){
			for(var j = 0;j<len;j++){
				if(empty(d,i,j)){
					this.childNodes.push(new Node(i,j,this));
				}
			}
		}
	}


	/*检查某位置是否为空*/
	function empty(data,x,y){
		return !!!data[x][y];
	}
	var prop = Brain.prototype;
	/*得到最优位置
	x,y为父节点
	*/
	prop.findBest = function(x,y){
		this.topNode = new Node(x,y,{'depth':this.depth,'level':-1,'data':this.data,'player':this.currentPlayer});
		console.log(this.topNode);
		this.topNode.search();
		var cNodes = this.topNode.childNodes;
		var bestStep = [];
		if(cNodes.length > 0){
			this.topNode.childNodes.sort(function(a,b){
				return a.value < b.value;//从大到小
			});
			cNodes.forEach(function(v,i){
				console.log('[',v.pos.x,v.pos.y,']','[player',v.player,']','[level,',v.level,']','[parentLevel',v.parentNode.level,']','[value',v.value,']');
			});
			var pos = cNodes[0].pos;
			bestStep = [pos.x,pos.y];
		}else{
			bestStep = this.topNode.greed();
		}
		return bestStep;
	}
})();