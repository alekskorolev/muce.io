var promiseMixin,
	doPromise;

doPromise = function(fn, ...args) {
    var promise = new Promise((resolve, reject) => {
        var success = options.success || (() => {}),
            error = options.error || (() => {}),
            context = options.context || this;

        options.success = (model, result, xhr) => {
            resolve(result);
            success.call(context, model, result, xhr);
        }
        options.error = (model, result, xhr) => {
            reject(result);
            error.call(context, model, result, xhr);
        }
        fn.call(this, ...args);
    });
    return promise;
}

promiseMixin = function(object, methods) {
	var i, promised, source, method;
	for (var i = methods.length - 1; i >= 0; i--) {
		method = methods[i];
		source = object[method];
		if (source instanceof Function) {
			promised = function(...args) {
				return doPromise.call(this, source, ...args);
			}
			object[method] = promised;
		}
	}
}