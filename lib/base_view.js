import $ from 'jquery';
import _ from 'underscore';

import {View} from 'backbone';

class BaseView extends View {
    template() {
        return '<span></span>';
    }
    initialize(options) {
        this.options = _.extend({}, this.defaults, options);
        this.template = this.options.template || this.template;
        this.model = this.options.model || this.model;
    }
    serializeModel(model) {
        var isPlainObject,
            modelForParse;

        modelForParse = model || this.model;
        isPlainObject = !_.isFunction(modelForParse.toJSON);
        return isPlainObject ? modelForParse : modelForParse.toJSON();
    }
    render(model) {
        var rendered;

        rendered = this.template([this.serializeModel(this.model), window]);
        this.$el.html(rendered);
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
        super.remove.call(this);
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
