(function($){
	var dataName = "options";
	/**初始化*/
	function _init(obj){
		var options = obj.data(dataName);
		obj.css({'width':'100px','border':'0','outline':'0'}).wrap($("<li>")).parent().wrap($("<ul>").addClass('tags_list',options.showTagClass));
		obj.parent().parent().click({cObj:obj},function(e){
			e.data.cObj.focus();
		})
		/*obj.wrap($("<div>")).parent().css('clear','both').wrap($("<div class='tagsEditor'>").addClass(options.showTagClass).click(function(){
			$(this).find("input").focus();//让输入框得到焦点
		})).before($("<ul>").addClass('tags_list'));
		*/
		var initTags = options.initTags;
		if(initTags){
			obj.multiTag('addTag',initTags);
		}
		if(options.isCanDelete){//是否添加backSpace事件
			if ($.browser.mozilla){
				obj.keypress(parseKey);
			}else{
				obj.keydown(parseKey);
			}
		}
		/**添加删除标签事件*/
		$(".tags_list").find(".bt_close").live("click",{reObj:obj},function(e){
			if(options.onRemoveBefore){
				options.onRemoveBefore.apply(e.data.reObj);
			}
			$(this).parent().remove();
			if(options.onRemoveAfter){
				options.onRemoveAfter.apply(e.data.reObj);
			}
		});
	}
	/**添加backSpace事件*/
	function parseKey(e){
		var $input = $(e.target);
		if(!$input.val() && e.which == 8){
			$input.parent().parent().find("li[class='tag_item']:last").remove();
		}
	}
	/**添加标签*/
	function addTag(obj,tag){
		var options = obj.data(dataName);
		if(options.onAddBefore){
			options.onAddBefore.apply(obj);
		}
		var nmt = options.maxTagNum;
		if(tag){
			tag = $.isArray(tag)?tag:tag.split();
			var c = obj.parent();
			for(var i in tag){				
				if((!nmt || nmt <= 0 || (!$(this).data('tagList') || $(this).data('tagList').length < nmt)) || 
					(!options.isCanRepeat && !isHaveTag($(this),tag))){
					c.before($("<li><span>"+tag[i]+"</span><a class='bt_close' title='删除'>x</a></li>").addClass('tag_item'));
					var tL = $(this).data('tagList')
					if($.isArray(tL)){
						tL.push(tag[i]);
					}else{
						$(this).data('tagList',[tag[i]]);
					}
				}else{
					break;
				}
			}
		}
		if(options.onAddAfter){
			options.onAddAfter.apply(obj);
		}
	}
	/**查看是否包含要添加的标签*/
	function isHaveTag(obj,tag){
		var tagL = obj.data('tagList');
		for(var i in tagL){
			if(tagL[i] == tag){
				return true;
			}
		}
		return false;
	}
	/**得到所有标签的值，返回数组*/
	function getValue(obj){
		return $(this).data('tagList');
	}
	/**销毁对象*/
	function destory(obj){alert(obj);
		obj.unwrap().parent().find("ul").remove();
		obj.unwrap();
	}
	/**public method */
	$.fn.multiTag = function(){
		var arg = arguments[0];
		if(arguments.length==0 || typeof arg == 'object'){
			arg = $.extend({},$.fn.multiTag.defaults,(arg||{}));
			$(this).data(dataName,arg);
			_init($(this));	
		}else if(arg){
			switch(arg){
				case 'addTag':
					if(arguments.length > 1){
						var tags = new Array();
						for(var i=1,j=arguments.length;i<j;i++){
							var v = arguments[i];
							$.isArray(v)?(tags = tags.concat(v)):tags.push(v);
						}
						addTag(this,tags);
					}
					break;
				case 'getValue':
					return getValue(this);
					break;
				case 'destory':
					destory(this);
					break;
			}
		}
		return this;
	}
	/**默认配置*/
	$.fn.multiTag.defaults = {
		isCanDelete : true,		//是否添加backSpace事件
		addTag : false,			//添加标签
		initTags : false,		//是初始化显示的标签
		showTagClass : '',		//要附加在UL上的样式
		onAddBefore : false,	//添加标签之前事件
		onAddAfter : false,		//添加标签之后事件
		onRemoveBefore : false,	//删除标签之前事件
		onRemoveAfter : false,	//删除标签之后事件
		maxTagNum : false,		//最多输入的标签个数
		isCanRepeat : false		//是否可以重复
	}
})(jQuery)