import _ from 'underscore';
import 'jquery';

class BaseSimpleComponent extends Object {
    constructor(options) {
        super();
        this.initialize(options);
    }
    initialize(options) {
        this.cId = options.id;
        this.uId = options.uId || '';
        this.data = options;
        this.render();
    }
    render() {
        var context,
            parent,
            rendered;

        parent = {
            'parent-uId': this.uId || '',
            'parent-name': this.name || ''
        };
        context = _.extend({}, this.data, parent);
        rendered = this.template(context);
        $(this.data.el).html(rendered);
        return rendered;
    }
    template() {
        return '<span>Your need extend base component</span>';
    }
}

export default BaseSimpleComponent;
