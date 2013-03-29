TestCase('format input',{
	'test wrong input 3': function(){
		jstestdriver.console.log('begin test');
		assertSame(1,calculate('1'));
	}
});