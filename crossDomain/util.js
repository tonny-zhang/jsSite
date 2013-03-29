var $ = function(id){
	return document.getElementById(id);
}
function getOtherDomain(){
	var domains = {
		'js.zk.com': 'js.tonny.com',
		'js.tonny.com': 'js.zk.com'
	}
	return 'http://'+domains[location.host];
}