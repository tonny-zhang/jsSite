<style>
form{

}
form span{
	display:inline-block;
	width:100px;
}
#loginResult{
	width:200px;
	text-align:center;
	background-color:yellow;
}
</style>
<form action="login.php" method="POST">
	<span>userName:</span><input type="text" name="userName" id="uName"/><br/>
	<span>userPwd:</span><input type="password" name="userPwd" id="uPwd"/><br/>
	<input type="submit" value="login"/>
</form>
<div id="loginResult"></div>
<script>
var isInitLogin = false;
var result = document.getElementById('loginResult')
function initLogin(user){
	if(!isInitLogin && user){
		isInitLogin = true;
		result.innerHTML = 'userName:'+user.userName+'<br/>userPwd:'+user.pwd+'<br/>loginIp:'+user.ip+'<br/>domain:'+user.loginDomain;
	}
}
function createScript(src){
	var ssoScript = document.createElement('script');
	ssoScript.src = src;
	document.getElementsByTagName('head')[0].appendChild(ssoScript);
	return ssoScript;
}
function tongbu(url){
	createScript(url);
}
;(function(){
	var ssoUrls = ['http://js.zk.com/sso/authTicket.php','http://js.tonny.com/sso/authTicket.php'];
	var host = location.host;
	for(var i = 0,len = ssoUrls.length;i<len;i++){
		var fnName = 'jsonp'+new Date().getTime()+''+i;
		createScript(ssoUrls[i]+'?callback='+fnName+'&'+Math.random());
		window[fnName] = function(user,domain){
			if(user){
				if(domain == host){
					//初始化用户
					initLogin(user);
				}else{//自动登录(初始化本域下session)
					createScript('http://'+host+'/sso/login.php?userName='+user.userName+'&userPwd='+user.pwd+'&callback=initLogin');
				}
			}
		}
	}
})();
</script>