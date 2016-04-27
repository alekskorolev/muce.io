import Backbone, { history } from 'backbone'
import $  from 'jquery'
import BaseCollection  from './lib/base_collection'
import BaseComponent  from './lib/base_component'
import BaseModel  from './lib/base_model'
import ParallelModel from './lib/parallel_model'
import ParallelCollection from './lib/parallel_collection';
import BaseRouter  from './lib/base_router'
import BaseSimpleComponent  from './lib/base_simple_component'
import BaseView  from './lib/base_view'
import browserDetector  from './lib/browser_detector'
import Storage  from './lib/storage'
import _  from './lib/underscore_extend'



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
    Backbone,
    browserDetector,
    ParallelCollection,
    ParallelModel,
    Storage,
    startHistory
}
