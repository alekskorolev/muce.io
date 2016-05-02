import _  from 'underscore'

var extract = function(context, key) {
	var k = key.shift();

	context = context[k];
	if (_.isUndefined(context) || key.length === 0) {
		return _.isFunction(context) ? context() : context;
	} else {
		return extract(context, key);
	}
}

_.mixin({
	extract: function(context, key, def) {
		if (_.isUndefined(context)) {
			return def;
		}
		if (_.isString(context)) {
			def = key;
			key = context;
			context = window;
		}
		if (_.isString(key) && key.length>0) {
			key = key.split('.');
			return extract(context, key) || def;
		} else {
			return context;
		}
	},
	log: function(...args) {
		if (window.DEBUG_MODE) {
			console.log(...args);
			console.trace('^^^ this log with trace ^^^');
		}
	},
	Logger: function(chanel) {
		return function(...args) {
			if (!_.isArray(window.LOG_ENABLED_CHANELS) || window.LOG_ENABLED_CHANELS.indexOf(chanel)>-1) {
				return _.log(chanel, ...args);
			}
		}
	},
	pyJSONparse: function(str) {
        if (!_.isString(str)) return str;
		var conv = str.replace(/\'/g,'"')
					  .replace(/None/g, 'null')
					  .replace(/False/g, 'false')
					  .replace(/True/g, 'true');
		return JSON.parse(conv);
	}
});

export default _;
