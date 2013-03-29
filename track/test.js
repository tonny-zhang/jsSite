(function(){
	var a = 1;
	var b = new Object(a);
	var test = function(a,b,c){

	}
	var obj = {
		name: 'test',
		run: function(){
			
		}
	}
	;(function(b){
		test(function(){

		});
		test(function(){
			if(true) this.name = 'if';
		},function(){

		});
		test(function(){

		},function(){

		},function(){

		});
	})(a)
})();