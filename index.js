import _ from './lib/underscore_extend';
import $ from 'jquery';
import Backbone from 'backbone';
import {history} from 'backbone';

import Storage from './lib/storage';
import browserDetector from './lib/browser_detector';

import BaseView from './lib/base_view';
import BaseModel from './lib/base_model';
import BaseCollection from './lib/base_collection';
import BaseComponent from './lib/base_component';
import BaseSimpleComponent from './lib/base_simple_component';
import BaseRouter from './lib/base_router';



var startHistory;

startHistory = _.bind(history.start, history);

export {
    $,
    _,
    BaseCollection,
    BaseComponent,
    BaseModel,
    BaseView,
    BaseRouter,
    BaseSimpleComponent,
    browserDetector,
    Storage,
    startHistory
}
