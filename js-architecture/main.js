//{{{ simple class and inheritance
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      	prototype[name] = typeof prop[name] == "function" &&
    		typeof _super[name] == "function" && fnTest.test(prop[name]) ?
	    (function(name, fn){
	      return function() {
	        var tmp = this._super;

	        // Add a new ._super() method that is the same method
	        // but on the super-class
	        this._super = _super[name];

	        // The method only need to be bound temporarily, so we
	        // remove it when we're done executing
	        var ret = fn.apply(this, arguments);       
	        this._super = tmp;

	        return ret;
	      };
	    })(name, prop[name]) :
	    prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
    	this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();
//}}}

//{{{ pub/sub
/*	

	jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)

	Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.

	Original is (c) Dojo Foundation 2004-2009. Released under either AFL or new BSD, see:
	http://dojofoundation.org/license for more information.

*/	

;(function(d){

	// the topic/subscription hash
	var cache = {};

	d.publish = function(/* String */topic, /* Array? */args){
		// summary: 
		//		Publish some data on a named topic.
		// topic: String
		//		The channel to publish on
		// args: Array?
		//		The data to publish. Each array item is converted into an ordered
		//		arguments on the subscribed functions. 
		//
		// example:
		//		Publish stuff on '/some/topic'. Anything subscribed will be called
		//		with a function signature like: function(a,b,c){ ... }
		//
		//	|		$.publish("/some/topic", ["a","b","c"]);

		if(typeof(args)=='object' && !(args instanceof Array)) {
			args = [args];
		}
		if (cache[topic]) {
			d.each(cache[topic], function(){
				this.apply(d, args || []);
			});
		}
	};

	d.subscribe = function(/* String */topic, /* Function */callback){
		// summary:
		//		Register a callback on a named topic.
		// topic: String
		//		The channel to subscribe to
		// callback: Function
		//		The handler event. Anytime something is $.publish'ed on a 
		//		subscribed channel, the callback will be called with the
		//		published array as ordered arguments.
		//
		// returns: Array
		//		A handle which can be used to unsubscribe this particular subscription.
		//	
		// example:
		//	|	$.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
		//
		if(!cache[topic]){
			cache[topic] = [];
		}
		cache[topic].push(callback);
		return [topic, callback]; // Array
	};

	d.unsubscribe = function(/* Array */handle){
		// summary:
		//		Disconnect a subscribed function for a topic.
		// handle: Array
		//		The return value from a $.subscribe call.
		// example:
		//	|	var handle = $.subscribe("/something", function(){});
		//	|	$.unsubscribe(handle);
		
		var t = handle[0];
		cache[t] && d.each(cache[t], function(idx){
			if(this == handle[1]){
				cache[t].splice(idx, 1);
			}
		});
	};

})(jQuery);
//}}}

//{{{ base class
var Module = Class.extend({
	init: function(obj) {
		this.name = obj.name;
		this.tpl = obj.tpl ? $(obj.tpl).text() : $('#'+obj.name+'-tpl').text();
		this.$el = obj.el ? $(obj.el) : $('#'+obj.name);
		this.data = {};
	},
	getTplData: function(data) {
		return this.data.tplData;
	},
	renderTpl: function(data) {
		this.data.tplData = data;
		var html = Mustache.to_html(this.tpl, data);
		this.$el.html(html);
	}
});

var Mediator = Class.extend({});
//}}}

var List = Module.extend({
	// Module 提供方法供Mediator调用
	hl: function($item, lock) {
		var $lis = this.$el.find('li');
		$lis.each(function(){
			$(this).removeClass('hl');
			if (lock) {
				$(this).data('locked', false);
			}
			if (!lock && $(this).data('locked')) {
				$(this).addClass('hl');
			}
		});
		if (lock)
			$item.data('locked', true);
		$item.addClass('hl');
	},
	unhl: function($item) {
		$item.removeClass('hl');
	}
});

var ListMediator = Mediator.extend({
	init: function(){
		var self = this;
		// 初始化Module
		this.module =new List({
			"name": "list"
		});
		// 绑定事件
		self.module.$el.delegate('li', 'click', function(e){
			e.preventDefault();
			// 调用Module方法
			self.module.hl($(this), true);
			var index = self.module.$el.find('li').index($(this));
			// 发布消息，所有监听该事件的方法将被触发
			// 参数为object，方便以后添加键值对
			$.publish(self.module.name+':click', {
				"content": self.module.getTplData().list[index].content
			});
		}).delegate('li', 'mouseover', function(e){
			self.module.hl($(this));
		}).delegate('li', 'mouseout', function(e){
			self.module.unhl($(this));
		});
		// 获取源数据，使用了$.proxy，创建特定的context
		$.getJSON('data.json', $.proxy(function(data){
			// 调用Module的方法
			this.module.renderTpl(data);
			// 发布数据已载入消息
			$.publish(self.module.name+':loaded', data);
		}, this));
	}
});

var Content = Module.extend({});

var ContentMediator = Mediator.extend({
	init: function(){
		this.module =new Content({
			"name": "content"
		});
		// 订阅list的点击事件
		$.subscribe('list:click', $.proxy(function(data){
			this.module.renderTpl(data);
		}, this));
	}
});

$(function(){
	var oListMediator = new ListMediator();
	// 订阅list的数据载入事件
	$.subscribe('list:loaded', function(data){//处理订阅事件时，如果不存在，可以通过配置，允许进行延时重复检测，指定失败次数后失败
		oListMediator.module.$el.find('li:first').trigger('click');
	});
	var oContentMediator = new ContentMediator();
});
