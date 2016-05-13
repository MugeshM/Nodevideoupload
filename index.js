var express =   require("express");
var multer  =   require('multer');
var path = require("path");
var fs = require('fs');
var app         =   express();
var fname;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


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
	name=name.replace(/ /g,"_");
    name=name.replace(/[^a-zA-Z0-9._]/g, '');
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

app.get('/files',function(req,res){
function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
            files_.push(files[i]);
        
    }
    return files_;
}
console.log(getFiles('uploads'))
res.send({"files":getFiles('uploads')})
});

var mmupload = multer({ storage: storage })
var cpUpload = mmupload.fields([{ name: 'uservideo', maxCount: 1 }])
app.post('/text', cpUpload,function (req, res) {
	console.log("ds"+req.body.txt);
	console.log("files"+req.files['uservideo'][0]);
	 res.send("Success");
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});