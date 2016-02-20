import _ from './underscore_extend';
import {Events} from 'backbone';

class BaseStorage {
	constructor() {
		
	}
}

class Storage extends _.mixed(BaseStorage, Events) {
	constructor(name) {
		super();
		this.storageName = name ? name + ':' : '';
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
