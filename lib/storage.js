import _ from './underscore_extend';
import {Events} from 'backbone';

class Storage {
    constructor() {
		this.storageName = name ? name + ':' : '';
        Object.assign(this, Events);
    }
	set(key, value, actor) {
		var storageValue = JSON.stringify(value);

		localStorage.setItem(this.storageName + key, storageValue);
	}
	get(key) {
		var storageValue = localStorage.getItem(this.storageName + key);

		return JSON.parse(storageValue);
	}
	remove(key) {
		localStorage.removeItem(this.storageName + key);
	}
}

export default Storage;
