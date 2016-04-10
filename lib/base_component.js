import _ from 'underscore';
import $ from 'jquery';
import BaseView from './base_view';

var log = _.Logger('BaseComponent');

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
    render(context) {
        var rendered,
            $rendered,
            contextData;

        context = this.beforeRender(context) || context;
        contextData = this.getContext(context);
        contextData.push(window);
        rendered = this.template(contextData);
        $rendered = $(rendered);
        this.$el.replaceWith($rendered);
        this.$el = $rendered;
        this.el = this.$el[0];
        this.delegateEvents(this.events);
        this.afterRender(rendered);
        return rendered;
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
