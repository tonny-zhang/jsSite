(function(global){
	var LEVEL = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
		'(': 3,
		')': 3
	}
	var PREG_OPERATOR = /[)(*/+-]/;
	var calculate = function(str){
		//确保输入的是字符串
		if(!str || typeof str != 'string' || (str = str.replace(' ',''),str.length == 0)){
			throw new Error('please enter a string');
		}

		var operatorStack = [],
			numStack = [];
		var len = str.length;
		var _char,_readIndex = 0;
		while(_readIndex < len){
			var _stack;
			//尝试读取一个数字
			_char = util.readNum(str,_readIndex);
			if(_char){
				numStack.push(Number(_char));
			}else{
				_char = str.charAt(_readIndex);
				if(PREG_OPERATOR.test(_char)){

					operatorStack.push(_char);
				}else{
					throw new Error('wrong char');
				}
			}
			_readIndex += _char.length;
			//jstestdriver.console.log(_char,numStack,operatorStack);
			util.yunsuan(numStack,operatorStack,_char);
		}
		//jstestdriver.console.log(numStack,operatorStack);
		if(numStack.length - operatorStack.length != 1){
			throw new Error('Invalid expression 1');
		}
		return util.yunsuan(numStack,operatorStack,_char,true);
		
	}
	var util = {
		readNum: function(str,startIndex){
			var num = '';
			var len = str.length;
			var _char;
			var isNegative=false;
			if((startIndex == 0 || str.charAt(startIndex-1) == '(') && str.charAt(startIndex) == '-'){
				startIndex++;
				isNegative = true;
			}
			while(startIndex < len){
				_char = str.charAt(startIndex);
				if(/[\d.]/.test(_char)){
					startIndex++;
					num += _char;
				}else{
					break;
				}
			}
			return num? (isNegative?'-':'')+num:num;
		},
		yunsuan: function(numStack,operatorStack,_char,isLast){
			//jstestdriver.console.log('first:',_char,numStack,operatorStack,isLast);
			var operatorLen = operatorStack.length;
			if(!isNaN(_char) && operatorLen > 0 && LEVEL[operatorStack[operatorLen-1]] == 2
				|| _char == ')'
				|| operatorLen > 1 && LEVEL[_char] == 1
				|| isLast
			){//可以进行一个运算
				if(numStack.length >= 2){
					var isBracket = _char == ')';
					if(isBracket){
						operatorStack.pop();//让后括号出栈
					}
					var operator = operatorStack.pop();
					//jstestdriver.console.log(operator,operatorStack[operatorStack.length - 1],LEVEL[operatorStack[operatorStack.length - 1]]);
					if(LEVEL[operator] == 1){
						var len = operatorStack.length;
						if(len > 0 && LEVEL[operatorStack[len - 1]] == 1){
							var temp = operatorStack.pop();//进行同级左计算，把后操作符再放回栈中
							operatorStack.push(operator);
							operator = temp;
						}else if(!isLast && !isBracket){//当不是最后一个，也不没有括号时
							operatorStack.push(operator);
							return isTest();
						}
					}
					if(isBracket && operatorStack[operatorStack.length - 1] == '('){
						operatorStack.pop();//让前括号出栈
					}
					var numTwo = numStack.pop();
					var numOne = numStack.pop();
					var result;
					switch (operator){
						case '+':
							result = numOne + numTwo;
							break;
						case '-':
							result = numOne - numTwo;
							break;
						case '*':
							result = numOne * numTwo;
							break;
						case '/':
							result = numOne / numTwo;
							break;
						default:
							throw new Error('Invalid expression');
					}
					//jstestdriver.console.log(numOne,operator,numTwo,'=',result);
					numStack.push(result);
					return util.yunsuan(numStack,operatorStack,result,isLast);
				}else{
					if(isLast){
						return numStack.pop();
					}else{
						return numStack;//测试用
					}	
				}
			}
			return isTest();
			function isTest(){
				//jstestdriver.console.log('isTest');
				if(isLast || operatorStack.length == 0 && numStack.length > 0){
					return numStack[numStack.length-1];
				}else{
					return [numStack,operatorStack];//供测试使用
				}
			}
		}
	}
	window.util = util;//供测试使用
	window.calculate = calculate;
})(window);