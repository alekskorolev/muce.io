import _ from 'underscore';
import {Router} from 'backbone';

class BaseRouter extends Router {
    log(...args) {
        _.log(...args, this);
    }
	startModuleRoutes(moduleRoutes) {
		if (_.isArray(moduleRoutes)) {
			moduleRoutes.forEach((routes) => {
				var prefix = routes.prefix,
					moduleName = routes.moduleName,
					View = routes.View,
					list = routes.routes,
					moduleOptions = routes.options;

				if (!this.Views[moduleName]) {
					this.Views[moduleName] = View;
				}
				list.forEach((route) => {
					this.startModuleRoute(moduleName, prefix, moduleOptions, route);
				});
			});
		}
	}
	startModuleRoute(moduleName, prefix, options, route) {
		this.route(prefix + route.path, function() {
			var action;

			if (route.auth && !_.extract(this, 'user.isAuthenticated')) {
				window.history.back();
				return false;
			}
			if (!this.views[moduleName]) {
				this.views[moduleName] = new this.Views[moduleName](options);
				this.views[moduleName].router = this;
			}
			action = this.views[moduleName][route.action] || (() => {});
			action.apply(this.views[moduleName], arguments);
		});
	}
	initialize(options) {
		this.Views = {};
		this.views = {};
		this.user = options.user;
		this.startModuleRoutes(options.moduleRoutes)
		super.initialize(options);
	}
};

export default BaseRouter;
