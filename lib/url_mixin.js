import {sync} from 'backbone';

class UrlMixin {
    url(options = {}) {
        var baseUrl = this.Url instanceof String ? this.Url : this.Url(options);

        return baseUrl + this.getQueryString(options);
    }
    Url(options = {}) {
        return '/';
    }
    getQueryString(options = {}) {
        return '';
    }
    sync(method, model, options) {
        if (!options.url && _.isFunction(this.url)) {
            options.url = this.url(options);
        }
        sync.call(this, method, model, options);
    }
    doPromise(options, type, fn) {
        var promise = new Promise((resolve, reject) => {
            var success = options.success || (() => {}),
                error = options.error || (() => {}),
                context = options.context;

            options.success = (model, result, xhr) => {
                this.trigger(type + '.success', model, result, options);
                resolve(model, result, xhr);
                success.call(context, model, result, xhr);
            }
            options.error = (model, result, xhr) => {
                this.trigger(type + '.error', model, result, options);
                reject(model, result, xhr);
                error.call(context, model, result, xhr);
            }
            fn();
        });
        return promise;
    }
}
