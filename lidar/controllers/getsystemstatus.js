// JavaScript File
var tssim = require("../readertrigger/triggersender.sim.js");
// console.log(tssim);
// var _rebootTime = "";
// var _lidarStatus = false;
// var _cameraStatus = false;
// var _totalTriggers = 0;

var gss = (function () {
    var me = {};
    
    me.init = function()
    {
        var _t = Date.now();
        _rebootTime = new Date(_t).toString();
    }
    
    // me.getCameraStatus = function()
    // {
    //     return _cameraStatus;
    // }
    
    me.setCameraStatus = function(status)
    {
        _cameraStatus = status;
    }
    
    // me.getLidarStatus = function()
    // {
    //     return _lidarStatus;
    // }
    
    me.setLidarStatus = function(status)
    {
        _lidarStatus = status;
    }
    
    me.getTotalTriggers = function()
    {
        return _totalTriggers;
    }
    
    me.addTriggerCount = function()
    {
        _totalTriggers++;
    }
    
    me.getsystemstatus = function(req, res)
    {
         var ss = {};
         ss.cameraStatus = tssim.getCameraStatus();
         ss.lidarStatus = tssim.getLidarStatus();
         ss.rebootTime = tssim.getRebootTime();
         ss.totalVehicles = tssim.getTotalVehicles()
         ss.totalStop = tssim.getTotalStop()
         ss.triggersHistory = tssim.getTriggersHistory();
    
         res.json(ss);
    }
    
    return me;
}());

module.exports = gss;