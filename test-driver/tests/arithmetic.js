//输入异常检测
TestCase('format input',{
	'test wrong input 1': function(){
		assertException(function(){
			calculate(1)
		},'Error');
	}
	,
	'test wrong input 2': function(){
		assertException(function(){
			calculate('a+b')
		},'Error');
	}
	,
	'test wrong input 3': function(){
		assertException(function(){
			calculate('1+')
		},'Error');
	}
	,
	'test wrong input 3': function(){
		assertSame(1,calculate('1'));
	}
});

//从字符串读取一个数字
TestCase('test util.readNum',{
	'test read a number': function(){
		assertSame("1",util.readNum('1',0));
	},
	'test read a number': function(){
		assertSame("2",util.readNum('1+2',2));
	}
	,
	'test read a number': function(){
		assertSame("201",util.readNum('1+201',2));
	}
	,
	'test read a number': function(){
		assertSame("201",util.readNum('1+201+3',2));
	}
	,
	'test read a number': function(){
		assertSame("-2",util.readNum('-2+201+3',0));
	}
	,
	'test read a number': function(){
		assertSame("",util.readNum('-1-201+3',2));
	}
	,
	'test read a number': function(){
		assertSame("-201",util.readNum('-1+(-201*3)',4));
	}
});
//测试util.yunsuan
TestCase('test util.yunsuan',{
	'test util.yunsuan simple': function(){
		assertSame(1,util.yunsuan([1],[],'1'));
	}
	,
	'test util.yunsuan simple1': function(){
		assertSame(3,util.yunsuan([1,2],['+'],'2',true));
	}
	,
	'test util.yunsuan simple2': function(){
		assertSame(-1,util.yunsuan([1,2],['-'],'2',true));
	}
	,
	'test util.yunsuan simple3': function(){
		assertSame(2,util.yunsuan([1,2],['*'],'2',true));
	}
	,
	'test util.yunsuan simple4': function(){
		assertSame(0.5,util.yunsuan([1,2],['/'],'2',true));
	}
	,
	'test util.yunsuan three number': function(){
		assertEquals([[-1],['-']],util.yunsuan([1,2],['-','-'],'-'));
	}
	,
	'test util.yunsuan complex1': function(){
		assertEquals([[1,2],['+']],util.yunsuan([1,2],['+'],'2'));
	}
	,
	'test util.yunsuan complex2': function(){
		assertEquals([[1,2,3],['/','+']],util.yunsuan([1,2,3],['/','+']));
	}
	,
	'test util.yunsuan complex3': function(){
		assertEquals([[1,6],['-']],util.yunsuan([1,2,3],['-','*'],'3'));
	}
	,
	'test util.yunsuan complex4': function(){
		assertEquals(5,util.yunsuan([1,2,3],['*','(','+',')'],')'));
	}
	,
	'test util.yunsuan complex5': function(){
		assertEquals([[1,14],['+']],util.yunsuan([1,2,3,4],['+','*','(','+',')'],')'));
	}
});

TestCase('temp',{
	'test': function(){
		assertSame('1+2=3',3,calculate('1+2'));
	}
	,
	'test many num operate -': function(){
		assertSame('1-2-3=-4',-4,calculate('1-2-3'));
	},
});

//测试简单运算
TestCase('simple',{
	setUp: function(){
		//this.Arithmetic = new Arithmetic();
	},
	'test simple 1': function(){
		assertTrue(true);
	}
	,
	'test simple': function(){
		assertSame(1,calculate('1'));
	}
	,
	'test simple two num operate +': function(){
		assertSame('1+2=3',3,calculate('1+2'));
	}
	,
	'test two num operate -': function(){
		assertSame('1-2=-1',-1,calculate('1-2'));
	}
	,
	'test two num operate *': function(){
		assertSame('1*2=2',2,calculate('1*2'));
	}
	,
	'test two num operate /': function(){
		assertSame('1-2=-1',-1,calculate('1-2'));
	},
	'test many num operate +': function(){
		assertSame('1+2+3=6',6,calculate('1+2+3'));
	},
	'test many num operate -': function(){
		assertSame('1-2-3=-4',-4,calculate('1-2-3'));
	},
	'test many num operate *': function(){
		assertSame('1*2*3=6',6,calculate('1*2*3'));
	},
	'test many num operate /': function(){
		assertSame('1/2/2=0.25',0.25,calculate('1/2/2'));
	}
});
//测试复杂运算
TestCase('complex',{
	'test complex 1': function(){
		assertSame('1+(2+3*4)*5=71',71,calculate('1+(2+3*4)*5'));
	}
	,
	'test complex 2': function(){
		assertSame('1*(2*3+4)-5/2=7.5',7.5,calculate('1*(2*3+4)-5/2'));
	}
	,
	'test complex 3': function(){
		assertSame('1*(2*3+4)-5/2=7.5',7.5,calculate('1*(2*3+4)-5/2'));
	}
	,
	'test complex 4': function(){
		assertSame('0.1*(2*3+4)-5/2=-1.5',-1.5,calculate('0.1*(2*3+4)-5/2'));
	}
	,
	'test complex 5': function(){
		assertSame('-0.1*(2*3+4)-5/2=-3.5',-3.5,calculate('-0.1*(2*3+4)-5/2'));
	}
	,
	'test complex 6': function(){
		assertSame('-0.1*(-2*3+4)-5/2=-2.3',-2.3,calculate('-0.1*(-2*3+4)-5/2'));
	}
	,
	'test complex 7 exception': function(){
		assertException(function(){
			calculate('-0.1*(-2*3+4-5/2');
		},'Error');
	}
})