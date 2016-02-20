import _ from './underscore_extend';
import {Model, sync} from 'backbone';

import UrlMixin from './url_mixin';

class BaseModel extends Model {
    fetch(options = {}) {
        return this.doPromise(options, 'fetch', () => {
            super.fetch(options);
        });
    }
    save(attrs={}, options={}) {
        return this.doPromise(options, 'save', () => {
            super.save(attrs, options);
        });
    }
    destroy(options = {}) {
        return this.doPromise(options, 'destroy', () => {
            super.destroy(options);
        });
    }
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

export default BaseModel;
