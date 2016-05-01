import BaseModel from './base_model';

class ParallelModel extends BaseModel {

    fetch(options = {}) {
        if (this.fetchPromise) {
            return this.fetchPromise;
        }
        this.fetchPromise = super.fetch(options);

        this.fetchPromise.then((res) => {
			this.fetchPromise = false;
            return res;
		}).catch((err) => {
			this.fetchPromise = false;
            return err;
		});
		return this.fetchPromise;
    }
    save(attrs=null, options={}) {
        if (this.savePromise) {
            return this.savePromise;
        }
        this.savePromise = super.save(attrs, options);

        this.savePromise.then((res) => {
			this.savePromise = false;
            return res;
		}).catch((err) => {
			this.savePromise = false;
            return err;
		});
		return this.savePromise;
    }
    destroy(options = {}) {
        if (this.destroyPromise) {
            return this.destroyPromise;
        }
        this.destroyPromise = super.destroy(options);

        this.destroyPromise.then((res) => {
			this.destroyPromise = false;
            return res;
		}).catch((err) => {
			this.destroyPromise = false;
            return err;
		});
		return this.destroyPromise;
    }
}

export default ParallelModel;
