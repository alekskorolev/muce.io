import _ from './underscore_extend';
import {Collection} from 'backbone';

import UrlMixin from './url_mixin';

class BaseCollection extends _.mixed(Collection, UrlMixin) {
    fetch(options = {}) {
        return this.doPromise(options, 'fetch', () => {
            super.fetch(options);
        });
    }
};

export default BaseCollection;
