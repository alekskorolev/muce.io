import $ from 'jquery';
import _ from 'underscore';

import {View} from 'backbone';

class BaseView extends View {
    template() {
        return '<span></span>';
    }
    initialize(options = {}) {
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
    render(context) {
        var rendered,
            contextData;

        context = this.beforeRender(context) || context;
        contextData = this.getContext(context);
        contextData.push(window);
        rendered = this.template(contextData);
        this.$el.html(rendered);
        this.afterRender(rendered);
        return rendered;
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
        super.remove();
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
        var formDataArray = this.$(form).serializeArray(),
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
