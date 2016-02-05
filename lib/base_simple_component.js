import _ from 'underscore';
import 'jquery';

class BaseSimpleComponent {
    constructor(options) {
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
        //context = _.extend(window.Settings || {}, this.data, parent);
        rendered = this.template([this.data, parent, window]);
        $(this.data.el).html(rendered);
        return rendered;
    }
    template() {
        return '<span>Your need extend base component</span>';
    }
}

export default BaseSimpleComponent;
