import BaseModel from './base_model';

class ParallelModel extends BaseModel {

    fetch(options = {}) {
        if (this.fetchPromise) {
            return this.fetchPromise;
        }
        this.fetchPromise = super.fetch(options);

        this.fetchPromise.then(() => {
			this.fetchPromise = false;
		}).catch(() => {
			this.fetchPromise = false;
		});
		return this.fetchPromise;
    }
    save(attrs=null, options={}) {
        if (this.savePromise) {
            return this.savePromise;
        }
        this.savePromise = super.save(attrs, options);

        this.savePromise.then(() => {
			this.savePromise = false;
		}).catch(() => {
			this.savePromise = false;
		});
		return this.savePromise;
    }
    destroy(options = {}) {
        if (this.destroyPromise) {
            return this.destroyPromise;
        }
        this.destroyPromise = super.destroy(options);

        this.destroyPromise.then(() => {
			this.destroyPromise = false;
		}).catch(() => {
			this.destroyPromise = false;
		});
		return this.destroyPromise;
    }
}

export default ParallelModel;
