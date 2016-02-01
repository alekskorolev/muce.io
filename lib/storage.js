class Storage {
	constructor(name) {
		this.storageName = name ? name + ':' : '';
	}
	set(key, value) {
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