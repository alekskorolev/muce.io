import _ from './underscore_extend';
import {Model, ajax} from 'backbone';

import UrlMixin from './url_mixin';


class BaseModel extends _.mixed(Model, UrlMixin) {
    fetch(options = {}) {
        return this.doPromise(options, 'fetch', () => {
            super.fetch(options);
        });
    }
    save(options = {}) {
        return this.doPromise(options, 'save', () => {
            super.save(options);
        });
    }
    destroy(options = {}) {
        return this.doPromise(options, 'destroy', () => {
            super.destroy(options);
        });
    }
}

export default BaseModel;
