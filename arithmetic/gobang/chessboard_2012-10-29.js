var PLAYER_WHITE = 1,PLAYER_BLACK = 2,
	//每条线之间的间隔
	SPACE_LINE = 30;
function getOtherPlayer(player){
	return PLAYER_WHITE + PLAYER_BLACK - player;
}
function copyArrayDepth(arr){
	var newArr = [];
	for(var i in arr){
		var a = arr[i];
		if(typeof a == 'object'){
			a = copyArrayDepth(a);
		}
		newArr[i] = a;
	}
	return newArr;
}
function Chessboard(border_size){
	var _this = this;
	_this.BORDER_SIZE = border_size;
	_this.html = $('<div>').addClass('board').css({'width':(border_size+1)*SPACE_LINE,'height':SPACE_LINE*(border_size+1)});
	_this.currentPlayer = PLAYER_WHITE;
	_this.data = [];
	_this.chessNum = 0;
}
(function(){
	/*得到相对棋盘的位置*/
	function getPos(x,y){
		return {
			left : x + SPACE_LINE,
			top : y + SPACE_LINE
		}
	}
	
	var prop = Chessboard.prototype;
	/*初始化*/
	prop.init = function(){
		var _this = this,
			bs = _this.BORDER_SIZE,
			middle = Math.floor(bs/2),
			min = Math.floor(middle/2),
			max = middle*2-min;
		for(var i = 0;i<bs;i++){
			_this._drawEleXY(0,i,'ab line line_h').css('width',(bs-1)*SPACE_LINE);//横线
			_this._drawEleXY(i,0,'ab line line_v').css('height',(bs-1)*SPACE_LINE);//竖线
			var tempDate = [];
			for(var j = 0;j<bs;j++){
				_this._drawEleXY(i,j,'ab bt',-15,-15).mouseenter(function(){
					bt_hover.css($(this).position()).show();
				}).mouseleave(function(){
					bt_hover.hide();
				}).click((function(x,y){
					return function(){
						_this._putChess(x,y,_this.robot);
					}
				})(i,j));//按钮
				tempDate[j] = 0;
			}
			_this.data[i] = tempDate;
			_this._drawEleXY(0,i,'ab txt',-20,-10).html(i+1);
			_this._drawEleXY(i,bs-1,'ab txt',-5,5).html(String.fromCharCode(65+i));
		}
		//放标记点
		_this._drawEleXY(middle,middle,'ab flag',-2,-2);
		if(middle - min > 3){
			_this._drawEleXY(min,min,'ab flag',-2,-2);
			_this._drawEleXY(min,max,'ab flag',-2,-2);
			_this._drawEleXY(max,min,'ab flag',-2,-2);
			_this._drawEleXY(max,max,'ab flag',-2,-2);
		}
		var bt_hover = _this._drawEleXY(0,0,'ab bt_hover');
		['lt','rt','lb','rb'].forEach(function(v){
			['h','v'].forEach(function(vv){
				$('<div>').addClass('ab '+vv+' '+v+vv).appendTo(bt_hover);
			});
		});
		return _this.html;
	}
	/*画元素*/
	prop._drawEleXY = function(x,y,cN,fixX,fixY){
		fixX = fixX || 0;
		fixY = fixY || 0;
		return this._drawEle(SPACE_LINE*x+fixX,SPACE_LINE*y+fixY,cN);
	}
	prop._drawEle = function(x,y,cN){
		var div = $('<div>');
		cN && div.addClass(cN);
		return div.css(getPos(x,y)).appendTo(this.html);
	}
	/*放棋子*/
	prop._putChess = function(x,y,robot){console.log('putChess:',x,y);
		var _this = this;
		if(_this.data[x][y] > 0){
			return;
		}
		_this._drawEleXY(x,y,'ab chessman '+(_this.currentPlayer == PLAYER_WHITE?'white':'black'),-10,-10).html(++_this.chessNum);
		_this.data[x][y] = _this.currentPlayer;
		_this.check(x,y,function(){
			_this._togglePlayer();
			robot && robot.call(this,x,y);
		});
	}
	/*转换玩家*/
	prop._togglePlayer = function(){
		this.currentPlayer = this.currentPlayer == PLAYER_WHITE?PLAYER_BLACK:PLAYER_WHITE;
	}
	/*重置*/
	prop.reset = function(){
		var bs = this.BORDER_SIZE;
		for(var i = 0;i<bs;i++){
			for(var j = 0;j<bs;j++){
				this.data[i][j] = 0;
			}
		}
		this.html.find('.chessman').remove();
		this.currentPlayer = PLAYER_WHITE;
		_this.chessNum = 0;
	}
	/*检查游戏状态*/
	prop.check = function(x,y,continueFn){
		var d = this.data,
			bs = this.BORDER_SIZE,
			player = this.currentPlayer;
		function f(step_x,step_y){
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
		if(f(-1,0)+f(1,0) > 5 || f(0,-1)+f(0,1) > 5 || f(-1,-1)+f(1,1) > 5 || f(1,-0)+f(-1,-1) > 5){
			alert((player == PLAYER_WHITE?'white':'black')+' win');
			this.reset();
		}else{
			continueFn.call(this);
		}
	}
	prop.robot = function(x,y){
		var grader = new Grader(this.getData(),this.BORDER_SIZE);
		grader.grade(PLAYER_BLACK);
		grader.grade(PLAYER_WHITE);
		return;
		///
		
		var bestStep = null;
		if(this.chessNum == 0){
			var middle = Math.floor(this.BORDER_SIZE/2);
			bestStep = [middle,middle];
		}else{			
			if(!this.brain){
				this.brain = new Brain(this.getData(),this.currentPlayer);
			}
			bestStep = this.brain.findBest(x,y);
		}
		console.log('bestStep:',String.fromCharCode(65+bestStep[0]),1+bestStep[1]);
		this._putChess(bestStep[0],bestStep[1]);
	}
	prop.getData = function(){
		return copyArrayDepth(this.data);
	}
})();