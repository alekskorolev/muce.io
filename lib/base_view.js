import _ from 'underscore';

import {View} from 'backbone';

var BaseView = View.extend({
    el: '#page-view',
    defaults: {
    },
    template: function(model) {
        return '<span></span>';
    },
    model: {},
    initialize: function(options) {
        this.options = _.extend(this.defaults, options);
        this.template = this.options.template || this.template;
        this.model = this.options.model || this.model;
    },
    serializeModel: function(model) {
        var isPlainObject,
            modelForParse;

        modelForParse = model || this.model;
        isPlainObject = !_.isFunction(modelForParse.toJSON);
        return isPlainObject?modelForParse:modelForParse.toJSON();
    },
    render: function(model) {
        var context,
            rendered;

        context = _.extend(window.Settings || {}, this.serializeModel(model));
        rendered = this.template(context);
        this.$el.html(rendered);
        return rendered;
    },
    routeByUrl: function(url) {
        window.location.href = url;
    },
    createChild: function(ChildView, options) {
        var child = new ChildView(options);

        this.children = this.children || {};
        this.children[child.cid] = child;
        child.parent = this;
        return child;
    },
    remove: function(isParentCall) {
        if (this.parent && !isParentCall) {
            this.parent.removeChild(this);
        }
        View.prototype.remove.call(this);
    },
    removeChildren: function() {
        _.each(this.children, function(child) {
            if (child) {
                child.removeCildren();
                child.remove(true);
            }
        });
    },
    removeChild: function(child) {
        if (_.isFunction(child.removeChildren)) {
            child.removeChildren();
            child.remove(true);
        }
        delete this.children[child.cid];
    }
});

export default BaseView;
