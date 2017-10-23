var JSZip = require('./jszip.min.js');
var fs = require('fs');


var uzip = (function() {
    var me = {};
    
    me.unpackZip = function(req, res) {
        var zip = new JSZip();
        var ss = {filename: [], zipFile, directory: []};
        var directory = fs.readdirSync("../");
        var zipFile = {name: "", data: []};
        directory.forEach(function(file) {
            if ((file.indexOf("lidar_") != -1) && (file.indexOf(".zip") != -1)) {
                zipFile.data = fs.readFileSync("../" + file);
                zipFile.name = "../" + file;
            }
        });
        ss.zipFile = zipFile;
        deleteFolderRecursive = function(path) {
            // try {
                var files = [];
                if( fs.existsSync(path) ) {
                    files = fs.readdirSync(path);
                    files.forEach(function(file,index){
                        var curPath = path + "/" + file;
                        if(fs.lstatSync(curPath).isDirectory()) { // recurse
                            deleteFolderRecursive(curPath);
                        } else { // delete file
                            fs.unlinkSync(curPath);
                        }
                    });
                    if (path != "./") {
                        fs.rmdirSync(path);
                    } else {
                        return;
                    }
                }
            // } catch(e) {
            //     return;
            // }
        };
        deleteFolderRecursive("./");
        
        zip.loadAsync(zipFile.data).then(function (zip) {
            Object.keys(zip.files).forEach(function (filename) {
                if (filename.substr(-1) == "/") {
                    ss.directory.push(filename);
                } else {
                    ss.filename.push(filename);
                }
            })
        }).then(function() {
            for (var i = 0; i < ss.directory.length; i++) {
                if (!fs.existsSync(ss.directory[i])){
                    fs.mkdirSync(ss.directory[i]);
                }
            }
            ss.filename.forEach(function(filename) {
                zip.files[filename].async("nodebuffer").then(function(content) {
                    fs.writeFileSync(filename, content);
                })
            })
        }).then(function() {
            res.json(ss);
        })
    };

    return me;
}());

module.exports = uzip;
