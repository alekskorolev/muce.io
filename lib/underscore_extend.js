import _ from 'underscore';

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
	mixed: function() {
		var clsList = arguments, clx;

		var Mixed = function() {
			var i, clx;

			for (i = clsList.length - 1; i >= 0; i--) {
				clx = clsList[i];
				if (_.isFunction(clx)) {
					clx.apply(this, arguments);
				}
			};
		}
		for (i = clsList.length - 1; i >= 0; i--) {
			clx = clsList[i];

			Mixed.prototype = _.extend(Mixed.prototype, clx.prototype || clx);
		};
	    return Mixed;
	}
});

export default _;
