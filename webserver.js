const fs = require('fs')
function sendFile(response,file){
	if(file.substring(file.length-1)=='/')return sendFile(response,file+='index.html')
	if(!fs.existsSync(file))return response.writeHead(404).end()
	if(fs.statSync(file).isDirectory())return sendFile(response,file+='/index.html')
	switch(file.match(/[^.]+$/)[0]){
		case'html':response.appendHeader('Content-Type','text/html;charset=utf-8');break
		case'js':response.appendHeader('Content-Type','application/javascript;charset=utf-8');break
	}
	fs.createReadStream(file).pipe(response)
}
require('http').createServer((message,response)=>sendFile(response,'docs/'+message.url.match(/[^?]+/)[0])).listen(80)