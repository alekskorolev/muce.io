import _ from 'underscore';
import {Collection} from 'backbone';

var BaseCollection = Collection.extend({
    initialize: function() {
        this.on('wait:next:tick', this.nextTick, this);
        this._byCode = {};
        this._waitPool = [];
    },
    url: function(filter) {
        var url = this.Url + this.getFilterQuery(filter);
        return url;
    },
    getFilterQuery: function(filter) {
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
    },
    getList: function(name, key) {
        var List = this._lists[name];

        if (!List) {
            List = this._lists[name] = new this._lists._ListDefault();
        }
        return List;
    },
    setList: function(name, list) {
        this._lists[name] = list;
    },
    _lists: {
        _ListDefault: function () {
            return {
                list: [],
                perPage: {}
            }
        },
        _last: []
    },
    _waitSync: false,
    parse: function(resp) {
        return resp.results;
    },
    fetch: function(options) {
        if (this._waitSync) {
            this._waitPool.push(() => {
                Collection.prototype.fetch.call(this, options);
            });
        } else {
            this._waitSync = true;
            Collection.prototype.fetch.call(this, options);
        }
    },
    nextTick: function() {
        var nextSync = this._waitPool.shift();

        if (nextSync) {
            nextSync();
        } else {
            this._waitSync = false;
        }
    },
    // получить количество страниц.
    getCount: function(catId, list, syncFn) {
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
    },
    // получить детально
    getItemByKey: function(key, list, field='id') {
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
    },
    search: function(list, query, filters) {
        var promise = new Promise((resolve, reject) => {

        });

        return promise;
    },

});

export default BaseCollection;
