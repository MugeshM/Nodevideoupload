var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var path = require("path");
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname+ '-' + Date.now()+path.extname(file.originalname));
  }
});
var upload = multer({ storage : storage}).single('uservideo');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/video',function(req,res){
	console.log("File upload started");
    upload(req,res,function(err) {
		 
        if(err) {
			console.log("Error uploading file.");
            return res.end("Error uploading file.");
        }
		res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("File is uploaded");
		console.log("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});