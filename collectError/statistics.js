/*统计页面加载时间，必须在jquery后引用*/
var startTime = new Date().getTime(),
	loadTime = null,
	readyTime = null;
function getTime(){
	if(loadTime && readyTime){
		$.get('http://js.zk.com/collectError/blank.gif?readyTime='+(readyTime-startTime)+'&loadTime='+(loadTime-startTime));
	}
}
$(window).load(function(){
	loadTime = new Date().getTime();
	getTime();
});
$(function(){
	readyTime = new Date().getTime();
	getTime();
})