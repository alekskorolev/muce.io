import $ from 'jquery';
import 'jquery.cookie';
import Backbone from 'backbone';
import ajaxrequest from 'wg-ajaxrequest';

var CSRF_TOKEN,
    ajax,
    enableCsrfToken;

enableCsrfToken = Backbone.enableCsrfToken = function(appid) {
    var _appid;

    if (CSRF_TOKEN || CSRF_TOKEN === false) {
        return CSRF_TOKEN;
    }
    window.Settings = window.Settings || {};
    if (window.Settings.CSRF_TOKEN) {
        CSRF_TOKEN = window.Settings.CSRF_TOKEN;
        return CSRF_TOKEN;
    }
    _appid = appid || window.Settings.appid || false;
    if (!_appid) {
        CSRF_TOKEN = false;
        return CSRF_TOKEN;
    }
    CSRF_TOKEN = window.Settings.set('CSRF_TOKEN', $.cookie(_appid + '_csrftoken'));
    return CSRF_TOKEN;
};

ajax = Backbone.ajax = function(params) {
    Backbone.enableCsrfToken();
    return ajaxrequest.submit(params.data, params);
};

export {
    ajax,
    enableCsrfToken
};
