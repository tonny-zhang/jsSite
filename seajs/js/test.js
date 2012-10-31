define('#a',function(){
	return {
		name : 'a'
	}
})
define('#b',function(){
	return {
		name : 'b'
	}
})
define('#test/c',function(require,exports,module){
	var a = require('#a'),
		b = require('#b');
	module.exports = {
		name : 'test',
		a : a,
		b : b
	}
})