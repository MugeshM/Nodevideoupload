var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var path = require("path");
var fs = require('fs');
var fname;

app.get("/videos", function(req,res) {
	
  //console.log(__dirname+"\\uploads\\"+req.query.name);
  
  /*var stat = fs.statSync(__dirname+"\\uploads\\"+req.query.name);
  var total = stat.size;
    
    console.log('ALL: ' + total);
    res.writeHead(200, { 'Content-Type': 'video/*');
	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    fs.createReadStream("uploads\\"+req.query.name).pipe(res);*/
	
	  var file = __dirname +"\\uploads\\"+req.query.name;
	  var filename = path.basename(file);
	  //var mimetype = mime.lookup(file);

	  res.setHeader('Content-type', 'video/*');
	  res.setHeader('Content-disposition', 'attachment; filename=' + filename);

	  //var filestream = fs.createReadStream(file);
	  //filestream.pipe(res);
	  res.download(file);
	  
	});
	
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	var name=file.originalname.replace(/\.[^/.]+$/, "")+ Date.now()+ path.extname(file.originalname);
    callback(null, name);
	fname=name;
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
        res.end(fname);
		console.log("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});