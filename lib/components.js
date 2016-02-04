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
        this.namedStack[name] = this.namedStack[name] || [];
        this.namedStack[name].push(component);
        return component;
    },
    parseName: function(component) {
        if (component.name) {
            return component.name.replace(/([A-Z])/g, $1 => "-" + $1.toLowerCase());
        }
        if (component.prototype.name) {
            return '-' + component.prototype.name;
        }
        return false;
    },
    addComponents: function(component) {
        var name = this.parseName(component);

        if (_.isFunction(component) && name) {
            this.Components[name] = component;
        } else if (_.isArray(component) || _.isObject(component)) {
            _.each(component, function(comp) {
                var name = this.parseName(comp);

                if (_.isFunction(comp) && name) {
                    this.Components[name] = comp;
                }
            }, this);
        }
    }
});

export default ComponentsView;
