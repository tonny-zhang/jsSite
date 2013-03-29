buster.testCase('format input',{
	'test wrong input 1': function(){
		assert.exception(function(){
			calculate(1)
		},'Error');
	}
	,
	'test wrong input 2': function(){
		assert.exception(function(){
			calculate('a+b')
		},'Error');
	}
	,
	'test wrong input 3': function(){
		assert.exception(function(){
			calculate('1+')
		},'Error');
	}
	,
	'test wrong input 3': function(){
		assert.same(1,calculate('1'));
	}
});