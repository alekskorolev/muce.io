import _ from 'underscore';
import 'jquery';
import BaseView from './base_view';

class BaseComponent extends BaseView {
    template() {
        return '<span>Your need extend base component</span>';
    }
    initialize(options) {
        this.cId = options.id;
        this.uId = options.uId || '';
        this.components = options.components;
        this.data = options;
        this.$parent = this.$el.parents('#jsc' + this.data.parentName + this.data.parentId);
        this.render();
    }
    getContext(model) {
        var parent = {
            'parent-uId': this.uId || '',
            'parent-name': this.name || ''
        };
        return [this.serializeModel(model), this.data, parent, window];
    }
    render(model) {
        var rendered;

        rendered = this.template(this.getContext(model));

        this.$el.html(rendered);
        return rendered;
    }
    replace(rendered) {
        var $rendered = $(rendered);
        this.$el.replaceWith($rendered);
        this.$el = $rendered;
        this.el = rendered[0];
        return $rendered;
    }
};

export default BaseComponent;
