import _ from './underscore_extend';
import {Events} from 'backbone';

var log = _.Logger('Storage');

class Storage {
    constructor() {
		this.storageName = name ? name + ':' : '';
        Object.assign(this, Events);
    }
	set(key, value, actor) {
		var storageValue = JSON.stringify(value);

		log('Store ', key, ' = ', value);
		localStorage.setItem(this.storageName + key, storageValue);
	}
	get(key) {
		var storageValue = localStorage.getItem(this.storageName + key);

		log('Get stored ', key, ' = ', storageValue);
		return JSON.parse(storageValue);
	}
	remove(key) {

		log('Remove stored ', key, ' = ', storageValue)
		localStorage.removeItem(this.storageName + key);
	}
}

export default Storage;
