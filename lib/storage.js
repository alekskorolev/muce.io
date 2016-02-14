import {Events} from 'backbone';

class Storage extends Events {
	constructor(name) {
		this.storageName = name ? name + ':' : '';
		// TODO cделать возможность прослушивания локалстораджа с фильтрацией по ключам и источникам
		$(window).on('storage', function(event) {
			console.log(event.originalEvent);
		});
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
	onchange(key, cb) {

	}
}

export default Storage;