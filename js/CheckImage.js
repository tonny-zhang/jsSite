var userInfo = navigator.userAgent.toUpperCase();
var isIE = userInfo.indexOf("MSIE")>-1;
var isIE6 = isIE && userInfo.indexOf("MSIE 6.0")>-1;
var isFF = !isIE && userInfo.indexOf("FIREFOX")>-1;
/**加载上传文件*/
document.writeln("<script type=\"text/javascript\" src=\"/public_js/UploadFile.js\"></script>");
/**验证图片类*/
function CheckImage(){
	this.AllowExt = "jpg,gif,swf";	//【ie下无法正确得到PNG信息】允许上传的文件类型 0为无限制 每个扩展名后边要加一个"," 小写字母表示 
	this.AllowImgFileSize = 0;		//允许上传文件的大小 0为无限制 单位：KB 
	this.AllowImgWidth = 0;			//允许上传的图片的宽度 0为无限制　单位：px(像素) 
	this.AllowImgHeight = 0;		//允许上传的图片的高度 0为无限制　单位：px(像素)
	this.IsJingQueSize = false;		//是否要对图片的宽度和高度进行精确限制
}
/**验证图片，最好用在file的onchange事件上*/
CheckImage.prototype.check = function(obj){
	obj.setAttribute("isChecked","false");
	CheckImage.init(obj,this);
}
/**查看图片是否验证通过，表单验证时用此方法*/
CheckImage.isChecked = function(obj){
	var v = obj.getAttribute("isChecked");
	return (!v || v == "true");
}
/**加载图片信息*/
CheckImage.init = function(checkObj,configObj){
	var isImg = false;
	if(configObj.AllowExt != "0"){
		var fileName = checkObj.value;
		var ext = fileName.substr(fileName.lastIndexOf(".")+1).toLowerCase();
		if(ext){
			if(configObj.AllowExt.toLowerCase().indexOf(ext) == -1){
				alert("请选择正确的文件格式！");
				return false;
			}else{
				isImg = ext.indexOf("swf")==-1;
			}
		}else{
			alert("请选择文件！");
			return false;
		}
	}
	if(isImg){
		if(configObj.AllowImgFileSize>0 || configObj.AllowImgWidth>0 || configObj.AllowImgHeight>0){
			var obj = checkObj;
			var img = new Image();
			
			if(isFF){
				var dataObj = obj.files[0];
				img.src = dataObj.getAsDataURL();
				img.onload = function(){
					if(img.complete){
						return CheckImage.doit(configObj,obj,dataObj.fileSize,img.width,img.height);
					} 
				}		
			}else{
				if(isIE6){
					img.onreadystatechange = function(){
						if(img.readyState == "complete"){
						  return CheckImage.doit(configObj,obj,img.fileSize,img.width,img.height);
						}
					}
					img.src = obj.value;
				}else{
					var upload = new UploadFile(obj,{
						action : "/uploadFile.do",
						onFinish : function(imgArr){
							if(imgArr instanceof Array && imgArr.length>0){
								img.src = imgArr[0].src;
								img.onreadystatechange = function(){
									if(img.readyState == "complete"){
									  return CheckImage.doit(configObj,obj,img.fileSize,img.width,img.height);
									}
								}
							}else{
								alert("上传文件出现错误！");
							}
						}
					});
				}
			}
		}else{
			checkObj.setAttribute("isChecked","true");
		}
	}else{
		checkObj.setAttribute("isChecked","true");
	}
}
/**验证具体方法*/
CheckImage.doit = function(configObj,checkObj,fileSize,w,h){
	var allowFileSize = configObj.AllowImgFileSize
	if(allowFileSize > 0 && allowFileSize*1024 < fileSize){
		alert("最大上传"+allowFileSize+"K的文件！");
		return false;
	}	
	var allowHeight = configObj.AllowImgHeight;
	if(allowHeight > 0){
		if(configObj.IsJingQueSize){
			if(allowHeight != h){
				alert("只能上传高度为"+allowHeight+"px的图片!");
				return false;
			}
		}else{
			if(allowHeight < h){
				alert("最大能上传高度为"+allowHeight+"px的图片!");
				return false;
			}
		}
	}
	var allowWidth = configObj.AllowImgWidth;
	if(allowWidth > 0){
		if(configObj.IsJingQueSize){
			if(allowWidth != h){
				alert("只能上传宽度为"+allowWidth+"px的图片!");
				return false;
			}
		}else{
			if(allowHeight < h){
				alert("最大能上传宽度为"+allowWidth+"px的图片!");
				return false;
			}
		}
	}
	checkObj.setAttribute("isChecked","true");
}