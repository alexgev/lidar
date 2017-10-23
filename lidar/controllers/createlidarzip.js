var fs = require('fs');
var JSZip = require('./jszip.min.js');

 
var clz = (function() {
    var me = {};
    
    me.createlidarzip = function(req, res) {
        var quantity = 0;
        var zip = new JSZip();
        var deleteFile = fs.readdirSync("../");
        deleteFile.forEach(function(file) {
            if (((file.indexOf("lidar_") != -1) && (file.indexOf(".zip") != -1)) || (file == "netconfing.js") || (file == "triggerconfig.js")) {
                fs.unlinkSync("../" + file);
            }
        });
        fs.writeFileSync("../netconfig.js", fs.readFileSync("./netconfig.js"));
        fs.writeFileSync("../triggerconfig.js", fs.readFileSync("./triggerconfig.js"));
        var ss = {files: []};
        var content = [];
        var walk = function(dir) {
            var results = [];
            var list = fs.readdirSync(dir);
            list.forEach(function(file) {
                file = dir + '/' + file;
                var stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    results = results.concat(walk(file));
                    quantity += 1;
                } else {
                    results.push(file);
                }
            })
            return results;
        }
        
        ss.files = walk("./");
        ss.files.forEach(function(file) {
            zip.file(file.substr(3), fs.readFileSync(file));
        });
        console.log(ss.files.length);
        console.log(Object.keys(zip.files).length - quantity);
        //res.send(ss.files.length);
        zip.generateAsync({type:"nodebuffer"})
            .then(function(data) {
                var date = new Date();
                var zipName = "../lidar_" + date.getUTCHours() + "_" + date.getUTCMinutes() + "_" + date.getUTCSeconds() + "_" +
                            date.getUTCDate() + "_" + (date.getUTCMonth() + 1) + "_" + date.getUTCFullYear() + ".zip";
        
                fs.writeFile(zipName, data, function(err) {
                    if (err) console.log("Error");
                    else console.log("Complete");
                });
            });
        res.json(ss);
    }
    return me;
}());

module.exports = clz;