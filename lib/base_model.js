import _ from 'underscore';
import {Model, ajax} from 'backbone';

//import './lib/backbone_wg_ajax';
var methodMap, BaseModel;

methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
};

BaseModel = Model.extend({
    url: function() {
        var url;

        if (_.isFunction(this.Url)) {
            url = this.Url(this.urlOption);
        } else {
            url = this.Url;
        }
        return url;
    },
    getType: function(method, model, options) {
        return methodMap[method];
    },
    sync: function(method, model, options) {
        var type = this.getType(method, model, options);

        _.defaults(options || (options = {}), {
            emulateJSON: true,
            crossDomain: true,
            dataType: 'json',
            method: type,
            xhrFields: {
                withCredentials: true
            }
        });

        var params = {type: type, dataType: 'json'};

        if (!options.url) {
          params.url = _.result(model, 'url') || urlError();
        }

        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
          params.contentType = 'application/json';
          if(options.emulateJSON){
             params.data = options.attrs || model.toJSON(options);
          }else{
             params.data = JSON.stringify(options.attrs || model.toJSON(options));
          }
        }
        if (options.emulateJSON) {
          params.contentType = 'application/x-www-form-urlencoded';
          //params.data = params.data ? {model: params.data} : {};
          params.data = params.data ? params.data : {};
        }

        if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
          params.type = 'POST';
          if (options.emulateJSON) params.data._method = type;
          var beforeSend = options.beforeSend;
          options.beforeSend = function(xhr) {
            xhr.setRequestHeader('X-HTTP-Method-Override', type);
            if (beforeSend) return beforeSend.apply(this, arguments);
          };
        }
        if (params.type !== 'GET' && !options.emulateJSON) {
          params.processData = false;
        }

        var error = options.error;
        options.error = function(xhr, textStatus, errorThrown) {
          options.textStatus = textStatus;
          options.errorThrown = errorThrown;
          if (error) error.call(options.context, xhr, textStatus, errorThrown);
        };

        var xhr = options.xhr = ajax(_.extend(params, options));
        model.trigger('request', model, xhr, options);
        return xhr;
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
