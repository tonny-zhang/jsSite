/**初始化配置*/
var initAjaxConfig = function(config){
	var obj = {};
	for(var i in Ajax_config){
		obj[i] = (i in config)?config[i]:Ajax_config[i];
	}
	return obj;
}
/**得到XMLHttpRequest对象*/
var getXMLHttpRequest = function() {   
	var xmlHttpRequest;     
	if(window.XMLHttpRequest){   
		xmlHttpRequest = new XMLHttpRequest();
		getXMLHttpRequest = function(){
			return new XMLHttpRequest();
		}
	}else if(window.ActiveXObject){  
		try{
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP"); 
			getXMLHttpRequest = function(){
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		}catch(e){   
			try{  
				xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
				getXMLHttpRequest = function(){
					return new ActiveXObject("Msxml2.XMLHTTP");
				}
			}catch(e){}   
		}   
	}   
	if ( !xmlHttpRequest ) {   
		alert("Create Ajax object failed!");   
	}   
	return xmlHttpRequest;   
} 
/**	url,要发起请求的地址；
	method,请求的方式;
	async,是否异步;
	postString,post请求时的参数;
	processFn，请求过程中要执行的方法；
	callbackFn，请求成功后执行的方法*/
var Ajax_config = {url:"",method:"get",async:true,postString:null,processFn:null,callbackFn:null};
function doAjax(){		
	var config = null;
	if(typeof arguments[0] == "string"){	//兼容旧写法 ,doAjax(url,callbackFn,processFn)
		config = {	url:arguments[0]?arguments[0]:"",
					async : false,
					processFn:arguments[2]?arguments[2]:null,
					callbackFn:arguments[1]?arguments[1]:null};
	}else{
		config = arguments[0];
	}
	config = initAjaxConfig(config);
	config.processFn && config.processFn();
	var xmlhttp = getXMLHttpRequest();
	var method = config.method.toUpperCase();
	xmlhttp.open(method, config.url, config.async);// HTTP 请求的方式, URL, 是否异步
	(method == "POST") && xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//post要写	
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status==200) {
			config.callbackFn && config.callbackFn(xmlhttp.responseText||"");
		}
	};
	// 开始发起浏览请求, Mozilla 必须加 null
	var postString = config.postString ? config.postString : null;
	xmlhttp.send(postString);
	if(!config.async){
		if(!document.all){
			config.callbackFn && config.callbackFn(xmlhttp.responseText||"");
		}
	}
}