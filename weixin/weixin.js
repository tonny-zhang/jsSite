(function(global){
	/*微信接口*/
	var weiXin_API = function(){
		var fn = typeof WeixinJSBridge != 'undefined'?
					(weiXin_API = WeixinJSBridge.invoke) : //检测存在后缓存
					function(api_name,options,callback){};

		fn.apply(this,arguments);
	}

	global.weixin = {
		//分享到朋友圈
		shareTimeline: function(title,desc,link,imgUrl){
			weiXin_API('shareTimeline',{
				"img_url": imgUrl,
				//"img_width": "640",
				//"img_height": "640",
				"link": link,
				"desc": desc,
				"title": title
			});
		}
		//发送给好友
		,sendMsg: function(title,desc,link,imgUrl){
			weiXin_API('sendAppMessage',{
				//"appid": appId,
				"img_url": imgUrl,
				//"img_width": "640",
				//"img_height": "640",
				"link": link,
				"desc": desc,
				"title": title
			});
		}
		//分享到腾讯微博
		,shareWeibo: function(title,link){
			weiXin_API('shareWeibo',{
				"content": title + link,
				"url": link
			});
		}
		//关注指定的微信号
		,addContact: function(name,callback){
			var STATUS = {
				 'add_contact:added': 1 //已经添加
				,'add_contact:ok': 2	//添加成功
				,'add_contact:cancel': 3//取消添加
			}
			weiXin_API("addContact", {webtype: "1",username: name}, function(e) {
				callback && callback(STATUS[e.err_msg] || 0);
				// WeixinJSBridge.log(e.err_msg);
				// //e.err_msg:add_contact:added 已经添加
				// //e.err_msg:add_contact:cancel 取消添加
				// //e.err_msg:add_contact:ok 添加成功
				// if(e.err_msg == 'add_contact:added' || e.err_msg == 'add_contact:ok'){
				//     //关注成功，或者已经关注过
				// }
			})
		}
	}
})(this);