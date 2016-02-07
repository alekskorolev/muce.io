import _ from 'underscore';
import 'jquery';
import BaseView from './base_view';

var BaseComponent = BaseView.extend({
    name: 'base',
    template: function() {
        return '<span>Your need extend base component</span>';
    },
    bound: false,
    initialize: function(options) {
        this.cId = options.id;
        this.uId = options.uId || '';
        this.components = options.components;
        this.data = options;
        this.$parent = this.$el.parents('#jsc' + this.data.parentName + this.data.parentId);
        this.render();
    },
    bindParent: function() {
        this.$parent.on('component:all:error', _.bind(this.onParentError, this));
        this.$parent.on('component:all:error:clear', _.bind(this.onClearErrors, this));
    },
    onParentError: () => {},
    onClearErrors: () => {},
    getContext: function(model) {
        var parent = {
            'parent-uId': this.uId || '',
            'parent-name': this.name || ''
        };
        return [this.serializeModel(model), this.data, parent, window];
    },
    render: function(model) {
        var rendered;

        rendered = this.template(this.getContext(model));

        this.$el.html(rendered);
        return rendered;
    },
    replace: function($rendered) {
        this.$el.replaceWith($rendered);
        this.$el = $rendered;
        this.el = $rendered[0];
        return $rendered;
    }
});

export default BaseComponent;
