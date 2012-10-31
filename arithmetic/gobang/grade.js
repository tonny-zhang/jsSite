function Grader(data,border){
	this.data = data.slice();
	this.border = border;
}
var line_cache = {},
	line_dot_cache = {};
(function(){
	function isInLineCache(pos,line_name){
		if(line_cache[pos]){
			return line_cache[pos].indexOf(line_name) > -1;
		}
		return false;
	}
	function setLineCache(pos,line_name){
		if(!line_cache[pos]){
			line_cache[pos] = [];
		}
		line_cache[pos].push(line_name);
		if(!line_dot_cache[line_name]){
			line_dot_cache[line_name] = [];
		}
		line_dot_cache[line_name].push(pos);
	}
	function check(otherPlayer,chess_line){
		var result = [];console.log(chess_line);
		for(var i = 0,j=chess_line.length;i<j;i++){
			var state = chess_line[i],
				sl = state.length,
				isDeath = state[0] == otherPlayer && state[sl-1] == otherPlayer;//当两头都为对方时，此点死
			var sum = 0;
			state.slice(1,-1).forEach(function(v){
				sum += v;
			});
			sum /= getOtherPlayer(otherPlayer);
			result.push(sum);
		}
		return result;
	}
	function getPos(x,y,bs){
		return x+y*bs;
	}
	function getXY(pos,bs){
		return [pos%bs,Math.floor(pos/bs)]
	}
	Grader.prototype.grade = function(player){
		var otherPlayer = getOtherPlayer(player);
		function f(pos,step_x,step_y){
			isInLineCache(pos)
			var isHaveSpace = false;
			pos = getXY(pos,bs);
			var result = [],dot = [];
			var x=pos[0]+step_x,y=pos[1]+step_y;
			if(!(x>=0&&x<bs&&y>=0&&y<bs)){
				dot.push(-1);
				result.push(-1);
			}
			for(;x>=0&&x<bs&&y>=0&&y<bs;x+=step_x,y+=step_y){
				var p = getPos(x,y,bs),
					v = d[p];
				if(v == 0){
					if(isHaveSpace){//当第二个空出现时，第一个为边界
						break;
					}
					isHaveSpace = true;
					result.push(0);
					dot.push(p);
					continue;
				}else if(v == player){
					result.push(player);
					dot.push(p);
				}else{
					if(!isHaveSpace){
						result.push(otherPlayer);
						dot.push(p);
					}
					break;
				}
			}
			console.log(pos,step_x,step_y,result);
			return [result,dot];
		}
		//计算每条线
		function getLine(one,two,pos){
			var state = one[0].reverse().concat(player,two[0]),
				sl = state.length,
				isDeath = (state[0] == otherPlayer || state[0] == -1) && (state[sl-1] == otherPlayer || state[sl-1] == -1);//当两头都为对方时，此点死
			var sum = 0;
			state.slice(1,-1).forEach(function(v){
				sum += v;
			});
			//console.log('state',state);
			sum /= player;
			var line_flag = '';
			if(sum > 1){//有两个以上点时做标记
				var line_dot = one[1].reverse().concat(pos,two[1]);
				line_flag = line_dot.shift()+'_'+line_dot.pop();
				
				line_dot.forEach(function(v){
					if(v != 0){
						setLineCache(v,line_flag);
					}
				});
			}
			return [sum,isDeath,line_flag];
		}
		var d = this.data,
			dl = d.length,
			bs = this.border,
			computer = [],
			person = [],
			sum = 0;
		for(var i = 0;i<dl;i++){//对各个点进行检查并标记
			var v = d[i];
			if(v > 0){//确保有子时进行
				//debugger 
				var u_d = getLine(f(i,0,-1),f(i,0,1),i);//上到下
				var lu_rd = getLine(f(i,-1,-1),f(i,1,1),i);//左上到右下
				var l_r = getLine(f(i,-1,0),f(i,1,0),i);//左到右
				var lb_ru = getLine(f(i,-1,1),f(i,1,-1),i);//左下到右上
				//console.log(i,getXY(i,bs),u_d,lu_rd,l_r,lb_ru);
				sum += getScore(i,u_d,lu_rd,l_r,lb_ru);
				//sum += u_d+lu_rd+l_r+lb_ru;
				/*
				var u_d = f(i,0,-1).reverse().concat(player,f(i,0,1));
				var lu_rd = f(i,-1,-1).reverse().concat(player,f(i,1,1));
				var l_r = f(i,-1,0).reverse().concat(player,f(i,1,0));
				var lb_ru = f(i,-1,1).reverse().concat(player,f(i,1,-1));
				*/
				//console.log(player,getXY(i,bs),' result: ',[u_d,lu_rd,l_r,lb_ru]);
			}
		}
		console.log(player,'sum:',sum);
	}
	function getScore1(){
		var score = 0;
		for(var a = arguments,len=a.length,i=0;i<len;i++){

		}
	}
	function getScore(pos,line_info){
		function f(line_info){
			var sum = line_info[0],
				isDeath = line_info[1],
				cache_name = line_info[2];
			if(line_dot_cache[cache_name]){
				line_dot_cache[cache_name] = null;//把缓存清除
			}
		}
		return sum;
	}
	function getSum1(pos,line_info){
		var sum = 0;
		for(var a = arguments,len=a.length,i=0;i<len;i++){
			a[i].forEach(function(v){
				sum += v;
			})
		}
		return sum;
	}
})()