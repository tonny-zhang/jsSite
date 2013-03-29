//由于JS是单线程的，下面while占用了JS线程，不会把线程交给setTimeout
//所以，这里的setTimeout并不会把线程交出，因此也不会停止
(function(){
	var flag = false;
	setTimeout(function(){
		console.log(flag,'clearTimeout');
		clearTimeout(tt);
	},2000);
	var tt = setTimeout(function(){
		var i = 1;
		while(i<10){
			
		}
		flag = true;
	},10);
})();