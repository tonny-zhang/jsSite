/**
 * options = {onFinish:function(){},onReady:function(){}};
 * */
function UploadFile(fileObj,options){
	this._iframe = null;
	this._form = null;
	this._file =  fileObj;
	this._options = options;
	this._upload();
	this._sending = false;
	this._time = 1000;
	this._finish = null;
	this._timeoutFN = null;
}
UploadFile.bind = function(fn,context){
	return function(){
		return fn.apply(context,arguments);
	}
}
UploadFile.isIE = navigator.userAgent.indexOf("MSIE")>-1;
UploadFile._counter = 1;
UploadFile.prototype = {
	_setIframe : function(){
		if(!this._iframe){
			var iframeName = "UploadFile_"+(UploadFile._counter++);
			var iframe = document.createElement(UploadFile.isIE?"<iframe name='"+iframeName+"'/>":"iframe");
			iframe.name = iframeName;
			iframe.style.display = "none";
			
			this._finish = UploadFile.bind(function(){
				var frameWindow = this._iframe.contentWindow || this._iframe.contentDocument;
				var imgArr = eval("("+frameWindow.document.body.innerHTML+")");
				var finish = this._options.onFinish;
				this._file.disabled = false;
				this._sending = false;
				this._dispose();
				finish && finish(imgArr);
			},this);
			if(UploadFile.isIE){
				iframe.attachEvent("onload",this._finish);
			}else{
				iframe.onload = this._finish;
			}
			this._iframe = iframe;
			document.body.appendChild(iframe);
		}
	},
	_setForm : function(){
		var form = document.createElement("form");
		form.target = this._iframe.name;
		form.method = "post";
		form.encoding = "multipart/form-data";
		form.action = this._options.action?this._options.action:"";
		form.style.padding = 0;
		form.style.margin = 0;
		form.style.border = 0;
		form.backgroundColor = "transparent";
		form.style.display = "inline";
		var file = this._file;
		file.parentNode.insertBefore(form,file).appendChild(file);
		this._form = form;
	},
	_dispose : function(){
		clearTimeout(this._timeoutFN);
		if (this._iframe) {
			var iframe = this._iframe;
			UploadFile.isIE ? iframe.detachEvent("onload", this._finish) : (iframe.onload = null);
			document.body.removeChild(iframe); this._iframe = null;
		}
		if(this._form){
			var form = this._form, parent = form.parentNode;
			if (parent) {
				parent.insertBefore(this._file, form); parent.removeChild(form);
			}
			this._form = null;
		}
	},
	_upload : function(){
		this._dispose();
		var ready = this._options.onReady;
		ready && ready();
		this._setIframe();
		this._setForm();
		this._form.submit();
		this._sending = true;
		this._timeoutFN = setTimeout(function(){
			if(this._sending){
				alert("由于网络原因或文件太大上传超时！");
				this._dispose();
			}
		},this._time);
	}
}