import _ from 'underscore';
import BaseView from './base_view';

class BaseComponent extends BaseView {
    template() {
        return '<span>Your need extend base component</span>';
    }
    initialize(options = {}) {
        this.beforeInitialize(options);
        this.cId = options.id;
        this.uId = options.uId || '';
        this.cName = options.name;
        this.components = options.components;
        this.data = options;
        this.$parent = this.$el.parents('#jsc' + this.data.parentName + this.data.parentId);
        this.render();
        this.afterInitialize(options)
    }
    getContext(context) {
        var parent = {
            'parent-uId': this.uId || '',
            'parent-name': this.name || ''
        }, result;

        result = super.getContext(context);
        result.push(this.data);
        result.push(parent);
        return result;
    }
    trigger(type, extraData={}) {
        var event = {
            type: type || this.cName,
            extra: extraData,
            actorTarget: this
        }

        this.$el.trigger(event);
    }
};

export default BaseComponent;
