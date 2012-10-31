var INFINITE = 999999;

var PD={
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
};

//pattern value
var PV=[
	0,1,2,4,8,16,32,64,128,256,512,1024
];

//attack
var FS=[
	[0,0,'A1'],
	[1,5,'D2'],
	[3,5,'D3'],
	[5,5,'D4'],
	[7,10,'A2'],
	[10,15,'A3'],
	[11,30,'A2_A2'],
	[14,500,'A3_A3'],
	[18,1500,'D4_A3'],
	[19,2000,'D4_D4'],
	[20,2000,'A4'],
	[22,INFINITE,'A5']
];

//defend
var LS=[
	[0,0,'A1'],
	[2,5,'D2'],
	[4,5,'D3'],
	[6,14000,'D4'],
	[8,10,'A2'],
	[9,1000,'A3'],
	[12,30,'A2_A2'],
	[13,1200,'A3_A3'],
	[15,15000,'D4_A3'],
	[16,20000,'D4_D4'],
	[17,20000,'A4'],
	[21,INFINITE]
];

function Brain(){
	var maxdepth = 6;
	var data;
	var neighbors;
	var pw,pb;
	var vctEnabled = false;
	var vcfEnabled = false;

	this.setLevel= function(level){
		if(level==1){
			vctEnabled = vcfEnabled = false;
		}
		else if(level==2){
			vcfEnabled = true;
			vctEnabled = false;
		}
		else if(level==3){
			vcfEnabled = true;
			vctEnabled = true;
			maxdepth = 6;
		}
		else if(level==4){
			vcfEnabled = true;
			vctEnabled = true;
			maxdepth = 8;
		}
	}
	
	this.ddscan=function(data){
		var all = [];
		var f = function(sx,sy,dx1,dy1,dx2,dy2){
			for(var i=0;i<BS;++i){
				var xx = sx + i*dx1;
				var yy = sy + i*dy1;
				var groups = [];
				var currentGroup = {s:-1,e:-1,c:0};
				var lastChess = 0;
				for(var j=0;j<BS;++j){
					var x=xx+j*dx2;
					var y=yy+j*dy2;
					var chess = data[x+y*BS];
					if(chess==lastChess && lastChess!=0){
						currentGroup.e=j;
					}
					else{
						lastChess=chess;
						if(currentGroup.s>=0){
							groups.push(currentGroup);
							currentGroup = {s:-1,e:-1,c:0,x:x,y:y,dx:dx2,dy:dy2};
						}
						if(chess!=0){
							currentGroup.c = chess;
							currentGroup.s = currentGroup.e = j;
						}
					}
				}
				if(currentGroup.s>=0){
					groups.push(currentGroup);
				}
				//melt groups
				for(var k=0;k<groups.length-1;++k){
					var g1 = groups[k];
					var g2 = groups[k+1];
					g1.num = g1.e-g1.s+1;
					if(g1.num<4 && g1.c==g2.c && (g2.s-g1.e<=2)){
						g1.e = (g1.e+4)>g2.e?(g2.e):(g1.e+4);
						g1.num = g1.num+(g1.e-g2.s+1);
					}
					if(g1.num>1){
						all.push(g1);
					}
				}
			}
		};
		
		f(1,1,0,1,1,0); //scan by row
		f(1,1,1,0,0,1); //scan by columns
		f(1,1,0,1,1,-1); f(2,BS,1,0,1,-1);
		f(1,1,0,1,1,1); f(2,1,1,0,1,1);
		
		return all;
	}
	
	var updateNeighbors = function(index){
		var flag = (data[index]>0)?1:-1;
		for(var dx=-2;dx<=2;++dx){
			for(var dy=-2;dy<=2;++dy){
				var j = index+dx+dy*(BS+2);
				if(j>=0 && j<DS){
					neighbors[j] += flag;
				}
			}
		}
	}
	
	var check = function(index,side,dx,dy){
		var result = PD.A1;
		var num =1 ;
		var c1=0,c2=0;
		var s1=0,s2=0;
		
		for(var i=1;i<=4;++i){
			var t = index+(-i)*dx+(-i)*dy*(BS+2);
			if(data[t]<0){
				break;
			}
			var chess = data[t];
			if(chess == side){
				c1 = s1 = -i;
				++num;
			}
			else if(chess == 0)	{
				s1 = -i;
			}
			else{
				break;
			}
		}
	
		for(var i=1;i<=4;++i){
			var t = index+i*dx+i*dy*(BS+2);
			if(data[t]<0){
				break;
			}
			var chess = data[t];
			if(chess == side){
				c2 = s2 = i;
				++num;
			}
			else if(chess == 0){
				s2 = i;
			}
			else{
				break;
			}
		}
		
		var ls = s2-s1+1;
		if(ls>=5 && num>1){
			if(c2-c1>4) {//len is too long,cut to 5
				var maxnum = 0;
				var cc1,cc2;
				for(var i=c1;i<=c2-4;++i)
				{
					var temp_num_count = 1,ccc1,ccc2;
					var first = true;
					for(var j=i;j<=i+4;++j)
					{
						var t = index + j*dx + j*dy*(BS+2);
						if(data[t] == side)	{
							++temp_num_count;
							if(first){
								ccc2 = ccc1 = j;
								first = false;
							}
							else{
								ccc2 = j;
							}
						}
					}
					if(ccc1>0) ccc1 = 0;
					if(ccc2<0) ccc2 = 0;

					
					if(temp_num_count>maxnum){
						maxnum = temp_num_count;
						cc1 = ccc1;
						cc2 = ccc2;
					}
					else if (temp_num_count == maxnum){
						if(ccc2-ccc1<cc2-cc1){
							cc1 = ccc1;
							cc2 = ccc2;
						}
					}
				}
				num = maxnum;
				c1 = cc1;
				c2 = cc2;
				if(c1>0) c1=0;
				if(c2<0) c2=0;
			}//end if(c2-c1>4)
			
			var lc = c2-c1+1;
			
			var alive = false;
			var t1 = index+(c1-1)*dx+(c1-1)*dy*(BS+2);
			var t2 = index+(c2+1)*dx+(c2+1)*dy*(BS+2);
			if(data[t1]>=0 && data[t2]>=0){
				alive = (data[t1]==0 || data[t1]==side)	&& (data[t2]==0 || data[t2]==side);
			}
			
			switch(num)
			{
			case 5:
				result=PD.A5;
				break;
			case 4:
				result = (ls>5 && lc==4 && alive) ? PD.A4 : PD.D4;
				break;
			case 3:
				result = (ls>5 && lc<=4 && alive) ? PD.A3 : PD.D3;
				break;
			case 2:
				if(ls>5)
				{
					if(lc == 2 && alive)
					{
						result = PD.A2;
					}
					else if(lc == 3)
					{
						result = PD.D2;
					}
				}
				break;
			}
		}
		return result;
	}
	
	var updatePattern = function(index,player){
		var result = new Array(12);
		for(var i=0;i<12;++i){
			result[i]=0;
		}
		result[check(index,player,1,0)]++;
		result[check(index,player,0,1)]++;
		result[check(index,player,1,1)]++;
		result[check(index,player,1,-1)]++;
		
		var a3 = result[PD.A3];
		var d4 = result[PD.D4];
		if(result[PD.A2]>=2){
			result[PD.A2_A2]++;
		}
		if(a3>=2){
			result[PD.A3_A3]++;
		}
		if(d4>=2){
			result[PD.D4_D4]++;
		}
		else if(d4>=1 && a3>=1){
			result[PD.D4_A3]++;
		}
		
		var p = 0;
		var max = 0;
		for(var j=11;j>=0;--j){
			if(result[j]!=0){
				p |= PV[j];
				if(max==0){
					max = j;
				}
			}
		}
		return [max,p];
	}
	
	var updateNeighborsPattern = function(index){
		var f = function(dx,dy){
			for(var i=1;i<=4;++i){
				var j = index+i*dx+i*dy*(BS+2);
				if(j>=0 && j<DS && data[j]==0){
					pb[j] = updatePattern(j,1);
					pw[j] = updatePattern(j,2);
				}
			}
		};
		
		f(1,0);f(-1,0);
		f(0,1);f(0,-1);
		f(1,1);f(-1,-1);
		f(1,-1);f(-1,1);
	}
	
	var makeMove = function(player,step){
		var index = step[0]+step[1]*(BS+2);
		data[index] = player;
		pb[index] = pw[index] = -1;
		updateNeighbors(index);
		updateNeighborsPattern(index);
	}
	
	var undoMove = function(step){
		var index = step[0]+step[1]*(BS+2);
		data[index] = 0;
		pb[index] = updatePattern(index,1);
		pw[index] = updatePattern(index,2);
		updateNeighbors(index);
		updateNeighborsPattern(index);
	}
	
	this.scan = function(board){
		data = board.getData();
		neighbors = new Array(DS);
		pw = new Array(DS);
		pb = new Array(DS);
		
		//init all varabiable
		for(var i=0;i<DS;++i){
			neighbors[i] = 0;
			pw[i]=pb[i]=-1;
		}
		
		//scan neighbours
		for(var x=1;x<=BS;++x){
			for(var y=1;y<=BS;++y){
				var index = x+y*(BS+2);
				var chess = data[index];
				if(chess>0){
					updateNeighbors(index);
				}
			}
		}
		
		//scan patterns
		for(var x=1;x<=BS;++x){
			for(var y=1;y<=BS;++y){
				var index = x+y*(BS+2);
				var chess = data[index];
				if(chess==0 && neighbors[index]>0){
					pb[index] = updatePattern(index,1);
					pw[index] = updatePattern(index,2);
				}
			}
		}
		return [neighbors,pb,pw];
	}
	
	var greed = function(player){
		var pm = (player==BLACK)?pb:pw;
		var pd = (player==BLACK)?pw:pb;
		
		var bestScore = -1;
		var steps = [];
		var scores = {};
		var attack = true;
		
		for(var x=1;x<=BS;++x){
			for(var y=1;y<=BS;++y){
				var index = x+y*(BS+2);
				if(pm[index]!=-1 && pd[index]!=-1){
					var s1=FS[pm[index][0]][0];
					var s2=LS[pd[index][0]][0];
					var s=s1>s2?s1:s2;
					var step = [x,y];
					if(s>bestScore){
						bestScore=s;
						steps = [step];
						scores = {};
						scores[step]=s1+s2;
						attack = (s1>s2);
					}
					else if(s==bestScore){
						steps.push(step);
						scores[step]=s1+s2;
					}
				}
			}
		}
		if(steps.length>1){
			steps.sort(function(a,b){
				if(scores[a]==scores[b])	
					return Math.random()-0.5;
				else
					return scores[b]-scores[a];
			});
		}
		
		return [bestScore,steps,attack];
	}
	
	var defend = function(player,step){
		var pd = (player==BLACK)?pw:pb;
		
		var steps = [];
		var x = step[0];
		var y = step[1];
		var f = function(dx,dy){
			for(var i=1;i<=4;++i){
				var sx = x+i*dx;
				var sy = y+i*dy;
				var j = sx+sy*(BS+2);
				if(j>=0 && j<DS && data[j]==0){
					var s = pd[j][1];
					if(s&PV[PD.A5]){
						steps=[[sx,sy]];
						return false;
					}
					if(s&PV[PD.A4]){
						steps.push([sx,sy]);
					}
				}
			}
			return true;
		};
		
		if(f(1,0) && f(-1,0) && f(0,1) && f(0,-1) && f(1,1) && f(-1,-1) && f(1,-1) && f(-1,1)){
		}
		return steps;
	}
	
	var vct = function(player,depth,result,parentStep){
		if(depth>=maxdepth){
			return false;
		}
		var pm = (player==BLACK)?pb:pw;
		var pd = (player==BLACK)?pw:pb;
		
		var steps = [];
		var mthreat = -1;
		var dthreat = -1;
		var bestStep = [];
		for(var x=1;x<=BS;++x){
			for(var y=1;y<=BS;++y){
				var index = x+y*(BS+2);
				if(pm[index]!=-1){
					var p = pm[index][1];
					if((p&PV[PD.D4]) || (p&PV[PD.A4]) || (p&PV[PD.A3])){
						steps.push([x,y]);
					}
					var t1 = FS[pm[index][0]][0];
					var t2 = LS[pd[index][0]][0];
					if(t1>mthreat){
						bestStep = [x,y];
						mthreat = t1;
					}
					if(t2>dthreat){
						dthreat = t2;
					}
				}
			}
		}
		if(mthreat>dthreat && mthreat>=13){
			result.push(bestStep);
			return true;
		}
		else if(mthreat<dthreat && dthreat>=13){
			return false;
		}
		
		for(var i=0;i<steps.length;++i){
			var step = steps[i];
			if(parentStep){
				var dx = parentStep[0]-step[0];
				var dy = parentStep[1]-step[1];
				if(dx<0) dx = -dx;
				if(dy<0) dy = -dy;
				var distance = dx>dy?dx:dy;
				if(distance>6){
					continue;
				}
			}
			//console.debug("VCT try step:"+step+",depth:"+depth);
			makeMove(player,step);
			var opSteps = defend(3-player,step);
			var find = false;
			var tempResult;
			for(var j=0;j<opSteps.length;++j){
				tempResult = [];
				var opStep = opSteps[j];
				makeMove(3-player,opStep);
				find = vct(player,depth+1,tempResult,step);
				undoMove(opStep);
				if(!find){ //if not find a VCT , break
					break;
				}
			}
			undoMove(step);
			if(find){
				for(var k=0;k<tempResult.length;++k){
					result.push(tempResult[k]);
				}
				result.push(step);
				return true;
			}
		}
		return false;
	}
	
	var vcf = function(player,depth,result,parentStep){
		var pm = (player==BLACK)?pb:pw;
		var pd = (player==BLACK)?pw:pb;
		
		var steps = [];
		var broken = false;
		for(var x=1;x<=BS;++x){
			for(var y=1;y<=BS;++y){
				var index = x+y*(BS+2);
				if(pm[index]!=-1){
					var p = pm[index][1];
					if((p&PV[PD.D4]) || (p&PV[PD.A4])){
						steps.push([x,y]);
					}
					if(pm[index][0]==PD.A5){
						result.push([x,y]);
						return true;
					}
					if(pd[index][0]==PD.A5){
						broken = true;
					}
				}
			}
		}
		if(broken){
			return false;
		}
		for(var i=0;i<steps.length;++i){
			var step = steps[i];
			if(parentStep){
				var dx = parentStep[0]-step[0];
				var dy = parentStep[1]-step[1];
				if(dx<0) dx = -dx;
				if(dy<0) dy = -dy;
				var distance = dx>dy?dx:dy;
				if(distance>6){
					continue;
				}
			}
			//console.debug("VCF try step:"+step+",depth:"+depth);
			makeMove(player,step);
			var opStep = defend(3-player,step)[0];
			makeMove(3-player,opStep);
			var find = vcf(player,depth+1,result,step);
			undoMove(opStep);
			undoMove(step);
			if(find){
				result.push(step);
				return true;
			}
		}
		return false;
	}
	
	this.findBestStep = function(board){
		this.scan(board);
		var player = board.getPlayer();
		var result = greed(player);
		var threat = result[0];
		var greedSteps = result[1];
		var attack = result[2];
		var bestStep = [];
		
		if(threat<21 && (vcfEnabled||vctEnabled)){
			var steps = [];
			if(vcfEnabled && vcf(player,0,steps) && steps.length>0){
				console.debug("VCF detected,result:"+steps);
				bestStep = steps[steps.length-1];
			}
			else if(vctEnabled && vct(player,0,steps) && steps.length>0){
				console.debug("VCT detected,result:"+steps);
				bestStep = steps[steps.length-1];
			}
			else if(attack && threat>=13){ //in attack way
				bestStep = greedSteps[0];
			}
			else{ //defend consideration
				if(threat>=13 && greedSteps.length==1){
					bestStep = greedSteps[0];
				}
				for(var i=0;i<greedSteps.length && bestStep.length==0;++i){
					var step = greedSteps[i];
					steps = [];
					console.debug("try to put chess:"+step);
					makeMove(player,step);
					if(vcfEnabled && vcf(3-player,0,steps) && steps.length>0){
						console.debug("VCF detected for opp,result:"+steps);
						if(threat<13){
							bestStep = steps[0];
						}
					}
					else if(vctEnabled && vct(3-player,0,steps) && steps.length>0){
						console.debug("VCT detected for opp,result:"+steps);
						if(threat<13){
							bestStep = steps[steps.length-1];
						}
					}
					else{
						bestStep = step;
					}
					undoMove(step);
				}
			}
		}
		
		if(bestStep.length==0){
			if(greedSteps.length>1){
				var ri = Math.floor((Math.random()*greedSteps.length));
				bestStep = greedSteps[ri];
			}
			else{
				bestStep = greedSteps[0];
			}
		}
		console.debug("best step:"+bestStep);
		return bestStep;
	}
}