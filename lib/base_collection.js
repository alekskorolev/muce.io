import _ from 'underscore';
import {Collection} from 'backbone';

var BaseCollection = Collection.extend({
    initialize: function() {
        this.on('wait:next:tick', this.nextTick, this);
        this._byCode = {};
        this._waitPool = [];
    },
    url: function(prefix, id, page, rel) {
        var url = this.Url;

        if (prefix) {
            url += prefix + '/';
            if (id) {
                url += id + '/';
                if (page) {
                    url += page + '/';
                    if (rel) {
                        url += rel + '/';
                    }
                }
            }
        }

        return url;
    },
    getList: function(name, key) {
        var List = this._lists[name];

        if (!List) {
            List = this._lists[name] = {list: []};
        }
        if (!key) {
            return List;
        }
        if (!List[key]) {
            List[key] = new this._lists._ListDefault();
        }
        return List[key];
    },
    setList: function(name, key, list) {
        this._lists[name][key] = list;
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
        return resp.list;
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
    getLast: function() {
        var options,
            promise;

        promise = new Promise((resolve, reject) => {
            // TODO: добавить проверку времени жизни
            if (this._lists._last.length) {
                this.trigger('last:update', this._lists._last);
                resolve(this._lists._last);
            } else {
                options = {
                    url: this.url(),
                    reset: true,
                    success: (collection) => {
                        this._lists._last = [...collection.models];
                        this.trigger('last:update', this._lists._last);
                        resolve(this._lists._last);
                        this.trigger('wait:next:tick');
                    },
                    error: () => {
                        reject();
                    }
                };
                this.fetch(options)
            }
        });

        return promise;
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
    getPage: function(name, id, last, page=0) {
        var options, List, promise, All;

        promise = new Promise((resolve, reject) => {
            List = this.getList(name, id);
            All = this.getList(name);
            if (List.perPage[page]) {
                this.trigger(name + ':' + id + 'update', List.perPage[page]);
                resolve(List.perPage[page])
            } else {
                options = {
                    url: this.url(name, id, page, last),
                    reset: true,
                    success: (collection, resp) => {
                        List.list = List.list.concat(collection.models);
                        All.list = All.list.concat(collection.models);
                        List.perPage[page] = collection.models;

                        if (resp.page_count) {
                            List.pageCount = resp.page_count;
                        }
                        this.setList(name, id, List);
                        this.trigger(name + ':' + id + 'update', List.perPage[page]);
                        resolve(List.perPage[page])
                        this.trigger('wait:next:tick');
                    },
                    error: (collection, resp) => {
                        reject({
                            context: collection,
                            result: resp
                        })
                    }

                }
                this.fetch(options);
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
