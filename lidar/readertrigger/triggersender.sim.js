

// console.log(triggersHistory);

var tssim = (function() {
    var _triggersHistory = [];
    var _rebootTime = new Date();
    var _lidarStatus = true;
    var _cameraStatus = true;
    var _totalVehicles = 43;
    var _totalStop = 55;
    var me = {};
    var i = 0;
    function triggersStack(data) {
        if (_triggersHistory.length > 9) {
             _triggersHistory.shift();
            _triggersHistory.push(data);
        } else {
            _triggersHistory[i] = data;
            i++;
        }
    }
    triggersStack({triggerType: "s", distance: "32", time: "21.32.98"});
    triggersStack({triggerType: "m", distance: "12", time: "21.32.98"});
    triggersStack({triggerType: "m", distance: "86", time: "21.32.98"});
    triggersStack({triggerType: "s", distance: "45", time: "21.32.98"});
    triggersStack({triggerType: "m", distance: "31", time: "21.32.98"});
    triggersStack({triggerType: "s", distance: "91", time: "21.32.98"});
    triggersStack({triggerType: "m", distance: "353", time: "21.32.98"});
    triggersStack({triggerType: "s", distance: "34", time: "21.32.98"});
    triggersStack({triggerType: "s", distance: "321", time: "21.32.98"});
    triggersStack({triggerType: "m", distance: "341", time: "21.32.98"});
    triggersStack({triggerType: "m", distance: "341", time: "21.32.98"});
    triggersStack({triggerType: "m", distance: "341", time: "21.32.98"});
    // console.log(_triggersHistory);

    me.getRebootTime = function() {
        return _rebootTime;
    }
    me.getLidarStatus = function() {
        return _lidarStatus;
    }
    me.getCameraStatus = function() {
        return _cameraStatus;
    }
    me.getTotalVehicles = function() {
        return _totalVehicles;
    }
    me.getTotalStop = function() {
        return _totalStop;
    }
    me.getTriggersHistory = function() {
        return _triggersHistory;
    }
    return me;
})();

module.exports = tssim;