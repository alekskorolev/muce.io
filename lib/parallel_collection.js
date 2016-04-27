import BaseCollection from './base_collection';

class ParallelCollection extends BaseCollection {

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
}

export default ParallelCollection;
