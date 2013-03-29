var http = require('http'),
	url = require('url');
var fs = require('fs');
var track = require('./track').track;
var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'application/javascript'});
	var query = url.parse(request.url).query;
	if(!query){
		return;
	}
	query = query.split('&');
	

	var queryObj = {};
	query.forEach(function(item,index){
		var a = item.split('=');
		a && a.length == 2 && (queryObj[a[0]] = a[1]);
	});
	if(queryObj.uri){
		var req = http.get(queryObj.uri,function (res) {
			var buffers = [], size = 0;
			res.on('close',function(){
				console.log('res close');
			}).on('data', function (chunk) {
				buffers.push(chunk);
				size += chunk.length;
			}).on('end',function(){
				var buffer = new Buffer(size), pos = 0;
				for(var i = 0, l = buffers.length; i < l; i++) {
					buffers[i].copy(buffer, pos);
					pos += buffers[i].length;
				}
				var content = track(buffer.toString());
				
				response.writeHead(200);
				response.end(content+'\n');
			});
		});
		req.end();
	}
	
	//response.end(query+'\n');
});
server.listen(8888)
server.maxConnections = 20;
console.log('Server running at http://localhost:8888');

//server.on('connection',function(){
//	console.log(server.connections);
//});
server.on('request',function(request,response){
	console.log(request.url);
});