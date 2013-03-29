(function(global){
	var callbackIndex = 0;
	var doc = document;
	var head = doc.head ||
				doc.getElementsByTagName('head')[0] ||
				doc.documentElement;
	var host = location.protocol + '//' + location.host;
	var currentDir = location.pathname.replace(/[^/]*?$/,'');

	function getScript(uri,callback){
		var script = document.createElement('script');
		var url = 'http://js.zk.com/track/getScript.php?'+(this.noCache?'r=&'+Math.random():'')+'uri='+ encodeURI(formateUrl(uri));
		if(callback){
			var callbackName = 'fn_'+callbackIndex++;
			global[callbackName] = function(data){
				if(data && data.content){
					var content = data.content.replace(/\\n/g,'\n');
					callback(content);
				}
				//global[callbackName] = null;
				//head.removeChild(script);
			}
			url += '&callback='+callbackName;
		}
		
		script.src = url;
		head.appendChild(script);
	}
	function formateUrl(url){
		if(!/^https?:\/\//.test(url)){
			if(url.charAt(0) != '/'){
				url = host + (currentDir + url).replace(/\.$/,'$^/');
			}
		}
		url = url.replace(/^(https?:)\/\//,'$1');		
		var temp;
		while(temp != (temp = url.replace(/[^/]+?\/\.\.\//,''))){
			url = temp;
		}
		while(temp != (temp = url.replace(/\.\//,''))){
			url = temp;
		}
		url = url.replace(/\/\//g,'/').replace(/^https?:/,'$&//');
		return url;
	}
	global.getScript = getScript;
})(window)