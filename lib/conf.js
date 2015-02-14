var listeners = {},
    configObject = {};

// === Public ===
var config = function(config, value) {
    if(typeof config === 'object')
        return setAllConfigs(config);

    if(typeof value !== 'undefined')
        return setConfig(config, value);

    if(typeof config === 'string')
        return getConfig(config);

    return getAllConfigs();
};

// === Private ===
function getConfig(name) {
    config.trigger(name, name, configObject[name]);
    return configObject[name];
}
function setConfig(k, value) {
    configObject[k] = value;
}
function getAllConfigs() {
    var cfg = {};

    for(var k in configObject) {
        if(!configObject.hasOwnProperty(k)) continue;

        cfg[k] = configObject[k];
    }

    return cfg;
}
function setAllConfigs(cfg) {
    for(var k in cfg) {
        if(!cfg.hasOwnProperty(k)) continue;

        setConfig(k, cfg[k]);
    }
}

// === Events ===
config.on = function(name, callback) {
    if(!listeners[name]) listeners[name] = [];
    listeners[name].push(callback);

    return function unsubscribe() {
        var i = listeners[name].indexOf('callback');
        listeners[name].splice(i, 1);
    }
};
config.trigger = function(name, newValue, oldValue) {
    if(!listeners[name]) return;
    listeners[name].forEach(function(callback) {
        callback(newValue, oldValue)
    });
};

// === Reset ===
config.reset = function() {
    configObject = {};
    listeners = {};
};

// === Export ===
module.exports = config;
if(typeof window !== 'undefined') window.conf = module.exports;