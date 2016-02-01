// TODO: remove underscore dependencies
import _ from 'underscore';
import $ from 'jquery';

import BaseView from './base_view';

var ComponentsView = BaseView.extend({
    stack: {},
    cIdStack: {},
    namedStack: {},
    Components: {
    },
    initialize: () => {},
    initComponent: function(name, id, parentId, options, content) {
        var Component = this.Components[name],
            elId = '#jsc' + name + id,
            extendedOptions = _.extend({
                uId: id,
                parentId: parentId,
                components: this,
                content: content.replace(/^\s+|\s+$/g, "")
            }, options),
            component;

        if (!Component || $(elId).length === 0) {
            return false;
        }
        extendedOptions.el = elId;
        component = new Component(extendedOptions);
        component.elId = elId;
        this.stack[id] = component;
        if (extendedOptions.id) {
            if (this.cIdStack[extendedOptions.id]) {
                if (_.isArray(this.cIdStack[extendedOptions.id])) {
                    this.cIdStack[extendedOptions.id].push(component);
                } else {
                    this.cIdStack[extendedOptions.id] = [
                        this.cIdStack[extendedOptions.id],
                        component
                    ];
                }
            } else {
                this.cIdStack[extendedOptions.id] = component;
            }
        }
        this.namedStack[name] = this.namedStack[name] || [];
        this.namedStack[name].push(component);
        return component;
    },
    addComponents: function(component) {
        var name;

        if (_.isFunction(component)) {
            name = component.name.replace(/([A-Z])/g, function($1){
                                return "-"+$1.toLowerCase();
                            });
            this.Components[name] = component;
        } else if (_.isArray(component) || _.isObject(component)) {
            _.each(component, function(comp) {
                name = comp.name.replace(/([A-Z])/g, function($1){
                                    return "-"+$1.toLowerCase();
                                });
                if (_.isFunction(comp) && comp.prototype.name) {
                    this.Components[name] = comp;
                }
            }, this);
        } else if (_.isObject(component)) {
            this.Components = _.extend(this.Components, component);
        }
    },
    proxyEvent: function(type, event, component) {
        var $el = component.$el,
            cId = ':' + component.cId,
            name = component.name + ':',
            params = [event, component],
            prefix = 'component:';

        if (cId) {
            this.triggerEvent($el, prefix + name + type + cId, event, params);
        }
        this.triggerEvent($el, prefix + name + type, event, params);
        this.triggerEvent($el, prefix + name + 'all', event, params);
        this.triggerEvent($el, prefix + 'all:' + type, event, params);
        this.triggerEvent($el, prefix + 'all:all', event, params);
    },
    triggerEvent: function($el, type, original, params) {
        var event = _.extend({}, original, {
            type: type,
            extra: params
        });

        $el.trigger(event, params);
    }
});

export default ComponentsView;
