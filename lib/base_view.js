import $ from 'jquery';
import _ from './underscore_extend';

import {View} from 'backbone';

var log = _.Logger('BaseView');

class BaseView extends View {
    template() {
        return '<span></span>';
    }
    initialize(options = {}) {
        
        log('before initialize');

        this.beforeInitialize(options);
        this.options = _.extend({}, this.defaults, options);
        this.template = this.options.template || this.template;
        this.model = this.options.model || this.model || false;
        this.afterInitialize(options)
    }
    beforeInitialize(options) {}
    afterInitialize(options) {}
    beforeRender(context) {}
    afterRender(rendered) {}
    getContext(context = false) {
        var contextData = _.isFunction((context || {}).toJSON) ? context.toJSON() : context,
            modelData = _.isFunction((this.model || {}).toJSON) ? this.model.toJSON() : this.model,
            result = [];

        if (contextData) {
            result.push(contextData);
        }
        if (modelData) {
            result.push(modelData);
        }
        result.push(window);
        return result;
    }
    render(context, replace=false) {
        var rendered,
            $rendered,
            contextData;

        context = this.beforeRender(context) || context;
        contextData = this.getContext(context);
        contextData.push(window);
        rendered = this.template(contextData);
        if (replace) {
            $rendered = $(rendered);
            this.$el.replaceWith($rendered);
            this.$el = $rendered;
            this.el = this.$el[0];
        } else {
            this.$el.html(rendered);
        }
        this.afterRender(rendered);
        return rendered;
    }
    delegateEvents(events) {
        this.events = _.extend(this.events || {}, events);
        super.delegateEvents(this.events);
    }
    redirectTo(url) {
        window.location.href = url;
    }
    createChild(ChildView, options) {
        var child = new ChildView(options);

        this.children = this.children || {};
        this.children[child.cid] = child;
        child.parent = this;
        return child;
    }
    remove(isParentCall) {
        if (this.parent && !isParentCall) {
            this.parent.removeChild(this);
        }
        View.prototype.remove.apply(this);
    }
    removeChildren() {
        _.each(this.children, function(child) {
            if (child) {
                child.removeCildren();
                child.remove(true);
            }
        });
    }
    removeChild(child) {
        if (_.isFunction(child.removeChildren)) {
            child.removeChildren();
            child.remove(true);
        }
        delete this.children[child.cid];
    }
    setFormToModel(form, set, reset) {
        var formDataArray = this.$(form || 'form').serializeArray(),
            formData = {};

        formDataArray.forEach(field => formData[field.name] = field.value);
        if (set && this.model) {
            if (_.isFunction(this.model.set)) {
                if (reset) {
                    this.model.clear();
                }
                this.model.set(formData);
            } else {
                _.extend(this.model, formData);
            }
        }
        return formData;
    }
};

export default BaseView;
