import _ from 'underscore';
import {Collection} from 'backbone';

import UrlMixin from './url_mixin';

class BaseCollection extends Collection, UrlMixin {
    fetch(options = {}) {
        return this.doPromise(options, 'fetch', () => {
            super.fetch(options);
        });
    }
};

export default BaseCollection;
