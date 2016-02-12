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
        var rendered = this.template(this.getContext());

        $(this.data.el).html(rendered);
        return rendered;
    }
    getContext() {
        return [this.data, {'parent-uId': this.uId, 'parent-name': this.name}, window];
    }
    template() {
        return '<span>Your need extend base component</span>';
    }
}

export default BaseSimpleComponent;
