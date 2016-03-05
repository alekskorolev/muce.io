import _ from './underscore_extend';
import {Model, sync} from 'backbone';

class BaseModel extends Model {
    constructor(attr={}, options={}) {
        super(attr, options);
        this.Url = this.Url || options.Url || '/';
    }
    fetch(options = {}) {
        return this.doPromise(options, 'fetch', () => {
            super.fetch(options);
        });
    }
    save(attrs=null, options={}) {
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
        console.log()
        var baseUrl = this.Url instanceof String ? this.Url : this.Url(options);

        return baseUrl + this.getQueryString(options);
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
    parse(resp, options) {
        if (resp.status === 200) {
            return resp.result;
        } else if (options.collection) {
            return resp;
        } else {
            return null;
        }
    }
    doPromise(options, type, fn) {
        var promise = new Promise((resolve, reject) => {
            var success = options.success,
                error = options.error,
                context = options.context || this;

            options.success = (model, result, xhr) => {
                resolve({
                    model: this,
                    result: result
                });
                if (success){
                    success.call(context, model, result, xhr);
                }
            }
            options.error = (model, result, xhr) => {
                reject({
                    model: this,
                    result: result
                });
                if (error) {
                    error.call(context, model, result, xhr);
                }
            }
            fn.call(this);
        });
        return promise;
    }
}

export default BaseModel;
