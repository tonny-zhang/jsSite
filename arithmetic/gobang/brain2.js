/*智能计算->博弈树*/
function Brain(board){
	var _this = this;
	_this.depth = 6;//检查树深度
	_this.board = board;
	_this.data = board.getData();console.log(_this.data);
}
/*
[
	[{x:1,y:2,cpu:1,user:2}],
	[{x:1,y:2,cpu:1,user:2}],
]
*/
(function(){
	function Node(data,parentNode){
		var parentNode = parentNode;
		this.cpuBoard = createBoard(data,PLAYER_WHITE),
		this.userBoard = createBoard(data,PLAYER_BLACK);
		console.log(this.cpuBoard);
		console.log(this.userBoard);
	}
	Node.prototype.getMax = function(){
		var cpuBoard = this.cpuBoard,max = cpuBoard[0].num;
		for(var i = 1,j=cpuBoard.length;i<j;i++){
			if(cpuBoard[i].num > max){
				max = cpuBoard[i].num;
			}
		}
		return max;
	}
	Node.prototype.getMin = function(){
		var userBoard = this.userBoard,min = userBoard[0].num;
		for(var i = 1,j=userBoard.length;i<j;i++){
			if(userBoard[i].num < min){
				min = userBoard[i].num;
			}
		}
		return min;
	}
	function Board(x,y,num){
		this.x = x;
		this.y = y;
		this.num = num;
	}

	function createBoard(data,player){
		var boards = [];
		//以不同身份得到各个点的权重
		var ds = data.length;
		for(var i = 0;i<ds;i++){
			for(var j = 0;j<ds;j++){
				var n = getChessNum(data.slice(),i,j,player);
				if(n > 0){
					boards.push(new Board(i,j,n));
				}
			}
		}
		return boards;
	}
	function getChessNum(d,x,y,player){
		var ds = d.length;
		function f(d,x,y,step_x,step_y){
			var _result = 0;
			for(var _x=x,_y=y;_x+step_x > 0 && _x+step_x<bs && _y+step_y > 0 && _y+step_y<bs;){
				if(d[_x][_y] == player){
					_result++;
				}else{
					break;
				}
				_x+=step_x;
				_y+=step_y
			}
			return _result;
		}
		return 1+f(-1,0)+f(1,0) +  f(0,-1)+f(0,1)  +  f(-1,-1)+f(1,1)  +  f(1,-0)+f(-1,-1);
	}
	
	var prop = Brain.prototype;
	prop.getTree = function(){
		var _t = this,
			ds = _t.BORDER_SIZE,
			d = _t.data;
		//_t.topBoard = createBoard(_t.board.getData(),_t.board.currentPlayer);
		_t.topNode = new Node(_t.board.getData());
		console.log(_t.topNode.getMax(),_t.topNode.getMin());
	}
	/*得到最优位置*/
	prop.findBest = function(){
		this.getTree();
		return [3,5];
	}
})();