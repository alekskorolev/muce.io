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
    getContext(context) {
        var parent = {
            'parent-uId': this.uId || '',
            'parent-name': this.name || ''
        }, result;

        result = super.getContext(context);
        result.push(parent);
        return result;
    }
};

export default BaseComponent;
