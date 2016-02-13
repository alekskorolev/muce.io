import _ from 'underscore';
import {Model, ajax} from 'backbone';

import UrlMixin from './url_mixin';


class BaseModel extends Model, UrlMixin {
    urs(options = {}) {
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
        var promise;

        if (!options.url && _.isFunction(this.url)) {
            options.url = this.url(options);
        }
        super.sync(method, model, options);
    }

}
BaseModel_back = Model.extend({
    url: function() {
        var url;

        if (_.isFunction(this.Url)) {
            url = this.Url(this.urlOption);
        } else {
            url = this.Url;
        }
        return url;
    },
    fetch: function(options) {
        Model.prototype.fetch.apply(this, [_.extend({
            method: 'GET',
            success: this.fetchSuccess,
            error: this.syncError,
            context: this
        }, options)]);
    },
    syncError: function(model, result, xhr) {
        this.trigger('sync:error', model, result, xhr);
    },
    saveSuccess: function(model, result, xhr) {
        this.trigger('save:success', model, result, xhr);
    },
    fetchSuccess: function(model, result, xhr) {
        this.trigger('fetch:success', model, result, xhr);
    },
    parse: function(data, options) {
        var parsed = options.collection ? data : data.result;
        return parsed;
    },
    open: function() {
        var promise = new Promise((resolve, reject) => {
            this.fetch({
                success: () => {
                    this.trigger('open:success', this);
                    resolve(this);
                },
                error: () => {
                    this.trigger('open:error', this);
                    reject(this);
                }
            });
        });

        return promise;
    }
});

export default BaseModel;
