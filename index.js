import _ from 'underscore';
import $ from 'jquery';
import {history} from 'backbone';

import BaseView from './lib/base_view';
import BaseModel from './lib/base_model';
import BaseCollection from './lib/base_collection';
import BaseComponent from './lib/base_component';
import BaseRouter from './lib/base_router';
import ComponentsView from './lib/components';
import './lib/gettext'
import Storage from './lib/storage';



var components,
	startHistory;

components = new ComponentsView();
window.snpcInit = _.bind(components.initComponent, components);
startHistory = _.bind(history.start, history);

export default components;

export {
    _,
    $,
    BaseCollection,
    BaseComponent,
    BaseModel,
    BaseView,
    BaseRouter,
    Storage,
    startHistory
}
