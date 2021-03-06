import { Collection, sync } from 'backbone'
import _  from './underscore_extend'
import UrlMixin  from './url_mixin'

var log = _.Logger('BaseCollection');

class BaseCollection extends Collection {
    constructor(models=[], options={}) {
        super(models, options);
        this.setFilter(options.filters);
    }
    fetch(options = {}) {
        return this.doPromise(options, 'fetch', () => {
            super.fetch(options);
        });
    }
    url(options = {}) {
        const baseUrl = this.Url instanceof String ? this.Url : this.Url(options),
              queryString = this.getQueryString(options);

        return baseUrl + (queryString.length > 0 ? '?' : '') + queryString;
    }
    Url(options = {}) {
        return '/';
    }
    getQueryString(options = {}) {
        const filters = [];
        let queryString;

        _.each(this.filters, (value, key) => {
            filters.push(key + '=' + value);
        });
        if (options.searchQuery) {
            filters.push(options.searchQuery);
        }
        return filters.join('&');
    }
    setFilter(filters={}) {
        this.filters = _.extend(this.filters || {}, filters);
        return this;
    }
    removeFilter(key) {
        if (key) {
            delete this.filters[key];
        }
        return this;
    }
    clearFilters() {
        this.filters = {};
        return this;
    }
    sync(method, collection, options) {
        if (!options.url && _.isFunction(this.url)) {
            options.url = this.url(options);
        }
        sync.call(this, method, collection, options);
    }
    parse(resp={}, options={}) {
        this.setFilter();
        if (resp.pagination && this.filters.page_size) {
            this.pageCount = Math.ceil(resp.pagination.count / this.filters.page_size);
        }
        if (resp.status = 200) {
            const models = (resp.results || []).map((model) => {
                return {
                    status: 200,
                    result: model
                };
            });
            return models;
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
