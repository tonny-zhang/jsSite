/*智能计算->博弈树*/
function Brain(data,player,borderSize){
	var _this = this;
	_this.depth = 4;//检查树深度
	//_this.board = board;
	_this.data = data;
	_this.currentPlayer = player;
	_this.borderSize = borderSize;
}
var AD = {
	'A1':0,
	'D2':1,
	'D3':2,
	'D4':3,
	'A2':4,
	'A3':5,
	'A2_A2':6,
	'A3_A3':7,
	'D4_A3':8,
	'D4_D4':9,
	'A4':10,
	'A5':11
}
;(function(){
	var prop = Brain.prototype;
	prop.scan = function(){
		var d = this.data;
		function f(pos,step_x,step_y){
			var isHaveSpace = false;
			pos = getXY(pos,bs);
			var result = 0;
			var x=pos[0]+step_x,y=pos[1]+step_y;
			for(;x>=0&&x<bs&&y>=0&&y<bs;x+=step_x,y+=step_y){
				var p = getPos(x,y,bs),
					v = d[p];
				if(v == 0){
					if(isHaveSpace){//当第二个空出现时，第一个为边界
						break;
					}
					isHaveSpace = true;
					result++;
					continue;
				}else if(v == player){
					result++;
				}else{
					break;
				}
			}
			console.log(pos,step_x,step_y,result);
			return result;
		}
		function check(pos){
			var dot_arr = new Array(12);
			for(var i = 0;i<12;i++){
				dot_arr[i] = 0;
			}
			dot_arr[f(i,0,-1)+f(i,0,1)+1]++;
			dot_arr[f(i,-1,0)+f(i,1,0)+1]++;
			dot_arr[f(i,-1,-1)+f(i,1,1)+1]++;
			dot_arr[f(i,-1,1)+f(i,1,-1)+1]++;
			
			if(dot_arr[AD.A2] >=2){
				dot_arr[AD.A2_A2]++;
			}
			if(dot_arr[AD.A3] >=2){
				dot_arr[AD.A3_A3]++;
			}
		}
		for(var i=0,j=this.borderSize;i<j;i++){
			check(i);
		}
		
	}
	prop.makeMove = function(step,player){
	
	}
	prop.undoMove = function(){
		
	}
	prop.findBestStep = function(){
		
		var bestStep = [1,2];
		console.log('findBestStep:',bestStep);
		return bestStep;
	}
})();