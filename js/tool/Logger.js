var Logger = (function(){	
	//是否处理调试
	var isDebug = true;
	//是否强制输出到控制台
	var isToConsole = false;	

	/*
	创建元素
	*/
	function _createEle(/*标签名*/tagName,/*样式数组*/styleArr,/*元素id*/id,/*元素类名*/cN){
		var ele = document.createElement(tagName);
		if(styleArr){
			for(var i in styleArr){
				ele.style[i] = styleArr[i];
			}
		}
		if(cN){
			ele.className = cN;
		}
		if(id){
			ele.id = id;
		}
		return ele;
	};
	/*
	初始化消息显示面板
	*/
	function _init(){
		var panel = _createEle('div',{
			width : '400px',
			height : '100px',
			position : 'absolute',
			right : '20px',
			top : '100px',
			zIndex : 99999,
			background : 'white',
			overflowY : 'auto',
			fontSize : '14px',
			border : '1px solid #ccc',
			paddingTop : '20px',
			cursor : 'move'
		},'console');
		function findDimensions(){ //函数：获取尺寸 
			var winWidth,winHeight;
			//获取窗口宽度 
			if (window.innerWidth) {
				winWidth = window.innerWidth; 
			}else if ((document.body) && (document.body.clientWidth)) {
				winWidth = document.body.clientWidth; 
			}
			//获取窗口高度 
			if (window.innerHeight) {
				winHeight = window.innerHeight; 
			}else if ((document.body) && (document.body.clientHeight)){ 
				winHeight = document.body.clientHeight; 
			}
			//通过深入Document内部对body进行检测，获取窗口大小 
			if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) { 
				winHeight = document.documentElement.clientHeight; 
				winWidth = document.documentElement.clientWidth; 
			} 
			return {'w':winWidth,'h':winHeight}
		} 
		//得到客户端浏览器的参数
		function getWin(){
			var isIe = !-[1,];
			var domBody = isIe?document.documentElement:document.body;
			var wH = findDimensions();
			return {
					'w' : wH.w,
					'h' : wH.h,
					'sT' : domBody.scrollTop,
					'sL' : domBody.scrollLeft,
					'sH' : domBody.scrollHeight,
					'sW' : domBody.scrollWidth
				};
		}
		panel.onmousedown = function(e){
			e = e || window.event;
			var x = e.offsetX,
				y = e.offsetY;
			var win = getWin();
			document.onmousemove = function(e1){
				e1 = e1 || window.event;
				var nX = e1.offsetX,
					nY = e1.offsetY;

				var oT = panel.offsetTop,
					oL = panel.offsetLeft,
					oH = panel.offsetHeight,
					oW = panel.offsetWidth,
					toY = oT + (nY-y),
					toX = oL + (nX-x);
				//console.log(oT,'-',win.sT,'+',oH,'=',oT - win.sT + oH,win.h);
				if(toY >= 0 && toY - win.sT + oH <= win.h){
					panel.style.top = toY + 'px';
				}
				if(toX >= 0 && toX - win.sL + oW <= win.w){
					panel.style.left = toX + 'px';
				}
			}
			document.onmouseup = function(e){
				this.onmousemove = null;
				if(e && e.stopPropagation){
					e.stopPropagation();
				}else{
					window.event.cancelBubble = true;
				}
				document.onmousemove = document.onmouseup = document.onselectstart = null;
			}
			document.onselectstart = function(){
				return false;
			}
		}
		document.getElementsByTagName('html')[0].appendChild(panel);
		//document.body.appendChild(panel);
		var btn = _createEle('div',{
			'position' : 'absolute',
			'right' : 0,
			'top': 0,
			'border' : '1px solid #123',
			'background' : 'white',
			'width' : '15px',
			'height' : '15px',
			'text-align' : 'center',
			'line-height' : '15px',
			'cursor' : 'pointer'
		});
		panel.appendChild(btn);
		btn.innerHTML = 'X';
		btn.onclick = function(){
			panel.style.display = 'none';
		}
	}
	/*
	得到当前时间
	*/
	function _getDate(){
		var d = new Date();
		return d.getFullYear()+'-'+_formateNum(d.getMonth()+1)+'-'+_formateNum(d.getDay())+' '+ 
			_formateNum(d.getHours())+':'+_formateNum(d.getMinutes())+':'+_formateNum(d.getSeconds());
	}
	/*
	格式化数字成两位
	*/
	function _formateNum(num){
		return num < 10?'0'+num:num;
	}
	/*
	得到格式化的消息字符串
	*/
	function _getMsg(){
		var len = arguments.length;
		if(len > 0){
			var arg = [];
			if(len == 1){
				arg.push(arguments[0]);
			}else{
				arg = Array.prototype.slice.call(arguments,0);
			}
			return _getDate()+'　　[ '+arg.join(' | ')+' ]';
		}
		return null;
	}
	var _log = (function(){
		if(!isToConsole || typeof console == 'undefined'){
			_init();
			return function(){
				var msg = _getMsg.apply(null,Array.prototype.slice.call(arguments,0));
				if(msg){
					var console = document.getElementById('console');
					var ele = document.createElement('div');
					ele.innerHTML = msg;
					console.insertBefore(ele,console.firstChild);
				}
			}
		}else{
			return function(){
				var msg = _getMsg.apply(null,Array.prototype.slice.call(arguments,0));
				if(msg){
					console.log(msg);
				}
			}
		}
	})();
	return {
		log : function(){
			if(isDebug){
				_log.apply(null,Array.prototype.slice.call(arguments,0))
			}
		}
	}
})();