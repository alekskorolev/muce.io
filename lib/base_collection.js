import _ from './underscore_extend';
import {Collection, sync} from 'backbone';

import UrlMixin from './url_mixin';

var log = _.Logger('BaseCollection');

class BaseCollection extends Collection {
    constructor(...args) {
        super(...args);
        this.filters = {};
    }
    log(...args) {
        _.log(...args, this);
    }
    fetch(options = {}) {
        return this.doPromise(options, 'fetch', () => {
            super.fetch(options);
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
        let queryString = '';

        _.each(this.filters, (value, key) => {
            queryString += key + '=' + value + '&'
        })
        return '';
    }
    addFilter(filters={}) {
        _.extend(this.filters, filters);
    }
    removeFilter(key) {
        if (key) {
            delete this.filters[key];
        }
    }
    clearFilters() {
        this.filters = {};
    }
    sync(method, collection, options) {
        if (!options.url && _.isFunction(this.url)) {
            options.url = this.url(options);
        }
        sync.call(this, method, collection, options);
    }
    parse(resp, options) {
        if (resp.status = 200) {
            return resp.results;
        } else {
            return [];
        }
    }
    doPromise(options, type, fn) {
        var promise = new Promise((resolve, reject) => {
            options.context = this;

            options.success = (collection, result, xhr) => {
                resolve({
                    collection: this,
                    result: result
                });
            }
            options.error = (collection, result, xhr) => {
                reject({
                    collection: this,
                    result: result
                });
            }
            fn.call(this);
        });
        return promise;
    }
};

export default BaseCollection;
