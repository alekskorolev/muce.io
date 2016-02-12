import _ from 'underscore';
import {Collection} from 'backbone';

class BaseCollection extends Collection {
    initialize() {
        this._byCode = {};
    }
    url(filter) {
        var url = this.Url + this.getFilterQuery(filter);
        return url;
    }
    sync(method, model, options) {
        var promise;

        if (!options.url && _.isFunction(this.url)) {
            options.url = this.url(options);
        }
        super.sync(method, model, options);

    }
    getFilterQuery(filter) {
        var queryFilter = filter || this._filter,
            queryes = [],
            query;

        if (queryFilter.ids && _.isArray(queryFilter.ids) && !_.isEmpty(queryFilter.ids)) {
            query = 'ids=' + queryFilter.ids.join('&ids=');
            queryes.push(query);
        }
        if (queryFilter.filters && _.isObjects(queryFilter.filters) && !_.isEmpty(queryFilter.filters)) {
            query = _.map(queryFilter.filters, (value, key) => key+'='+value).join('&');
            queryes.push(query);
        }
        if (queryFilter.order && _.isArray(queryFilter.order) && !_.isEmpty(queryFilter.order)) {
            query = 'order=' + queryFilter.order.join('&order=');
            queryes.push(query);
        }
        if (queryFilter.page) {
            queryes.push('page=' + queryFilter.page);
        }
        if (queryFilter.pageSize) {
            queryes.push('page_size=' + queryFilter.pageSize);
        }

        return '?' + queryes.join('&');
    }
    getList(name, key) {
        var List = this._lists[name];

        if (!List) {
            List = this._lists[name] = new this._lists._ListDefault();
        }
        return List;
    }
    parse(resp) {
        return resp.results;
    }
    // получить количество страниц.
    getCount(catId, list, syncFn) {
        var promise;

        promise = new Promise((resolve, reject) => {
            if (list.pageCount !== undefined) {
                resolve(list.pageCount);
            } else {
                this[syncFn](catId)
                    .then(() => {
                        resolve(list.pageCount);
                    }, (e) => {
                        reject(e);
                    });
            }
        });
        return promise;
    }
    // получить детально
    getItemByKey(key, list, field='id') {
        var item = this._byCode[key],
            promise;

        promise = new Promise((resolve, reject) => {
            if (!item) {
                item = this.getList(list).list.find((model) => { return model.get(field) === key });
                if (!item) {
                    item = new this.model({});

                    item.set(field, key);

                    item.open().then(
                        (item) => {
                            this._byCode[key] = item;
                            resolve(item);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                } else {
                    resolve(item);
                }
            } else {
                resolve(item);
            }
        });

        return promise;
    }
    search(list, query, filters) {
        var promise = new Promise((resolve, reject) => {

        });

        return promise;
    },

};

export default BaseCollection;
