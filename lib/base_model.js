import _ from './underscore_extend';
import {Model, sync} from 'backbone';

class BaseModel extends Model {
    constructor(attr={}, options={}) {
        super(attr, options);
        this.Url = options.Url || '/';
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
    doPromise(options, type, fn) {
        var promise = new Promise((resolve, reject) => {
            var success = options.success,
                error = options.error,
                context = options.context;

            options.success = (model, result, xhr) => {
                this.trigger('sync.success', model, result, options);
                this.trigger(type + '.success', model, result, options);
                resolve(result);
                if (success){
                    success.call(context, model, result, xhr);
                }
            }
            options.error = (model, result, xhr) => {
                this.trigger('sync.error', model, result, options);
                this.trigger(type + '.error', model, result, options);
                reject(result);
                if (error) {
                    error.call(context, model, result, xhr);
                }
            }
            fn();
        });
        return promise;
    }
    validate(attrs={}, options={}) {
        var errors = {},
            error,
            hasError = false;

        if (_.isArray(this.validators)) {
            _.each(this.validators, (validator) => {
                error = validator(attrs, options);
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
