import _ from 'underscore';

var extract = function(context, key) {
	var k = key.shift();

	context = context[k];
	if (_.isUndefined(context) || context.length === 0) {
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
	}
});
