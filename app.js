let fs = require('fs');  
let path = require('path');  
let http = require('http');

let basePath = __dirname;

var staticServe = function(req, res) {  
    let filePath = path.resolve(basePath);
    filePath = path.join(filePath, req.url);

	
	if (!fs.existsSync(filePath)) {
		res.writeHead(404, 'Not Found');
		res.write("File: '"+ filePath + "' doesn't exist.");
		res.end();
	}
	let type=fs.lstatSync(filePath);
	
	if (!type.isFile()) {
		res.writeHead(404, 'Not Found');
		res.write("Requested path is directory or link.");
		res.end();
	}
	
	var fileExt=path.extname(filePath)


	
	let content= 'text/html; charset=utf-8'
	switch(fileExt) {
		case '.json':
			content='application/json; charset=utf-8'
			break;
		case '.jpeg':
			content='image/jpeg'
			break;
		case '.js':
			content='application/javascript'
			break;
	}
	
	res.setHeader('Content-Type', content);
		
	fs.readFile(filePath ,{flags: 'r', encoding: "utf8"}, function (err, data) {
		res.writeHead(200, "ok");
        res.write(data);
		
		res.end();
    });
	
	
};
var httpServer = http.createServer(staticServe);  
httpServer.listen(8081); 