(function(global){
	var defaultConfig = {
		container: $('body'),
		colNum: 3,
		dataUrl: '',
		paramName: 'p'
	}
	function Feed(config){
		this.config = $.extend({},defaultConfig,config);
		this.page = 1;
		this.init();
		this.load();
	}
	var prop = Feed.prototype;
	prop.init = function(){
		var _this = this,
			_config = _this.config,
			_num = _config.colNum;
		_this.isLoading = false;
		this.heights = new Array();

		var container = $('<div class="content"></div>');
		_config.container.append(container)
		for(var i = 0;i<_num;i++){
			container.append($('<div>').addClass('col'));
			this.heights.push(0);
		}
		this.cols = container.find('.col');
		var btn_load = $('<div>').addClass('btn_load').html('<a href="javascript:;">点击加载更多</a>').click(function(){
			if(!_this.isLoading){
				_this.load();
			}
		});
		var loading = $('<div>').addClass('loading').html('正在加载').hide();
		container.after(btn_load.hide()).after(loading);
	}
	prop._url = function(){
		var _this = this,
			_config = _this.config;
		var url = _config.dataUrl;
		if(_this.page > 1){
			url += (~url.indexOf('?')?'&':'?')+_config.paramName +'='+ _this.page;
		}
		_this.page++;
		return url;
	}
	prop.load = function(){
		var _this = this;
		var container = _this.config.container;
		var loading = container.find('.loading').show();
		var btn_load = container.find('.btn_load').hide();
		$.getJSON(_this._url(),function(data){
			if(data && $.isArray(data) && data.length > 0){
				_this.render(data);
			}else{
				btn_load.hide();
				loading.hide();
			}
		})
	}
	
	prop.render = function(data){
		var _this = this,
			_cols = _this.cols,
			_heighs = _this.heights;
		var container = _this.config.container;
		var loadingNum = data.length;
		$(data).each(function(i,v){
			var minIndex = $.inArray(Math.min.apply(Math,_heighs),_heighs);
			_cols.eq(minIndex).append($('<article><a href='+v.href+'><img src="'+v.img+'"/></a></article>'));
			_heighs[minIndex] += v.w/200*v.h;
			if(--loadingNum == 0){
				container.find('.loading').hide();
				container.find('.btn_load').show();
			}
		});
	}
	global.Feed = Feed
})(this['MB'] || (this['MB'] = {}));