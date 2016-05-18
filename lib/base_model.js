import { Model, sync } from 'backbone'
import _  from './underscore_extend'

var log = _.Logger('BaseModel');

class BaseModel extends Model {
    constructor(attr={}, options={}) {
        super(attr, options);
        this.validators = options.validators;
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
    sync(method, model, options={}) {
        if (!options.url && _.isFunction(this.url)) {
            options.url = this.url(options);
        }
        options.xhrFields = {
           withCredentials: true
        };
        sync.call(this, method, model, options);
    }
    parse(resp, options) {
        if (resp.status === 200) {
            return resp.result;
        } else if (!resp.status) {
            return resp;
        } else {
            return {};
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
    validate(attrs={}, options={}) {
        var errors = {},
            error,
            hasError = false;

        if (_.isArray(this.validators)) {
            _.each(this.validators, (validator) => {
                error = validator(attrs, options, errors);
                if (error) {
                    hasError = true;
                    _.each(error, (msgs, field) => {
                        errors[field] = errors[field] ? _.unique(errors[field].concat(msgs)) : msgs;
                    });
                }
            });
        }
        return hasError ? errors : false;
    }
}

export default BaseModel;
