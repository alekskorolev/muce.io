import _ from 'underscore';
import {Model} from 'backbone';

//import './lib/backbone_wg_ajax';

var BaseModel = Model.extend({
    url: function() {
        var url;

        if (_.isFunction(this.Url)) {
            url = this.Url(this.urlOption);
        } else {
            url = this.Url;
        }
        return url;
    },
    sync: function(method, model, options) {
        options.data = options.data || options.attrs || model.toJSON(options);
        Model.prototype.sync.apply(this, arguments);
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
    parse: function(resp) {
        return resp.item;
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
