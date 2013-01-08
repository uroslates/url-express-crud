var MongooseResourceProvider = require('../providers/mongoose').MongooseResourceProvider
	, BaseResourceController = require('../controllers/base').BaseResourceController
	, BaseRoute = require('./base-route')
	// REST request verbs dictionary
	, VERBS = {
		GET: 'get'
		, PUT: 'put'
		, POST: 'post'
		, DELETE: 'del'
	};


// CRUDRouter class.

// Example:

//	var crudRouter = new CRUDRouter({
//
//		app: app,
//		Model: mongoose.model('SomeModel')
//
//	});

//	crudRouter.list = function(req, res, next) {
//
//		...
//		// provide custom routes function implementation ...
//		// collections are stored in the <req.locals>. Example:
//		// res.render('custom_template', {
//		//		items: req.locals.items
//		// });
//
//	};

// The routes that this Router class introduces to provided application instance by default are:
//
//		app.get('/items/', routes.index)
//
//		app.get('/items/form/', csrf, routes.form)
//
//		app.get('/items/form/:slug', csrf, routes.form)
//
//		app.post('/items/', routes.create)
//
//		app.put('/items/', csrf, routes.update)
//
//		app.get('/items/:slug', routes.read)
//
//		app.put('/items/:slug', csrf, routes.update)
//
//		app.get('/items/:slug/delete', routes.delete)

// In order to override default routes you can provide your own implementation of controller
// with the custom implementation of the function you want to override!
//
// var customController = new BaseResourceController({
//
//		resourceProvider: new MongooseResourceProvider({
//			Model: config.Model
//		})
//		, resourceRequestParamName: 'item'
//
//	});
//
// var CustomController = Object.create(customController);
//
// CustomController.list = function() {
//
//		// ... custom route function code
//
// };
//
// var crudRouter = new crud.CRUDRouter({
//
//	app: app
//
//	, Model: Item
//
//	// Now default list action will be overrided by your custom one
//
//	, controller: CustomController
//
// });

// @param config - JSON configuration
//
// {
//
//	// REQUIRED! express application instance
//
//	app: null
//
//	// REQUIRED! model class to be used by the library
//
//	Model: null
//
//	// configured controller instance to be used. Defaults to <MongooseResourceController>
//
//	, controller: null
//
//	// JSON object representing a routes configuration for the component
//
//	// Each entry object's key represents an internal name for the action it represents (list/details/create...)
//
//	// Each entry object's value consists of an array of 2 arguments:
//
//	// * 1st argument - corresponds to request method type [GET/POST/...]
//
//	// * 2nd argument - is an array of arguments that correspond to the arguments compatible with app.get(...), app.put(...), app.del(...), ... [e.g. app.get(uri, [middleware functions], routeCallbackFunction);]
//
//	, routes: {
//
//		list: ['get', ['/items/', customListRoute]]
//		, details: []
//		, update: []
//		, create: []
//		, delete: []
//		, createForm: []
//		, updateForm: []
//
//	}
//
//	// Base uri that will be used for resources routes (defaults to 'object')
//
//	, routeBaseUri: 'object'
//
//	// Templates configuration
//
//	, templates: {
//
//		// Custom list template path
//		list: 'list'
//		// Custom form template path (used for update/create)
//		, form: 'form'
//		// Custom details template path
//		, details: 'details'
//
//	}
//
//	// Context varible key value, which will be used for the resource retrieval within the templates (details/form templates)
//	// Defaults to 'object'
//
//	, resourceRequestParamName: 'item'
//
//	// Context varible key value, which will be used for the resource list retrieval within the template (list template)
//	// Defaults to 'objects'
//
//	, resourceRequestParamNamePlural: 'items'
//
// }
var CRUDRouter = function(config) {
	var crudrouter = this
		, _routes;

	// Assert REQUIRED
	if (!config.app) {
		throw new Error('ERROR: CRUDRouter(configuration): Constructor requires <configuration.app> to be set. Provided configuration: ', config);
	}
	this.app = config.app;
	if (!config.Model) {
		throw new Error('ERROR: CRUDRouter(configuration): Constructor requires <configuration.Model> to be set. Provided configuration: ', config);
	}
	this.Model = config.Model;

	// Ensure that appropriate resourceRequiredParamName(Plural) config parameters are set to customly provided controller
	if (config.controller) {
		config.controller.resourceRequestParamName = config.resourceRequestParamName ? config.resourceRequestParamName : 'object';
		config.controller.resourceRequestParamNamePlural = config.resourceRequestParamNamePlural ? config.resourceRequestParamNamePlural : 'objects';
	}

	// Set controller to customly configured controller or default controller
	var controller = config.controller || new BaseResourceController({
			resourceProvider: new MongooseResourceProvider({
				Model: this.Model
			})
			, resourceRequestParamName: config.resourceRequestParamName || 'object'
			, resourceRequestParamNamePlural: config.resourceRequestParamNamePlural || 'objects'
		});

	_routes = BaseRoute(this, {
		controller: controller
	});

	var constructFilePath = function(rootPath, fileName) {
		return arguments.length > 1 && arguments[0] ? [rootPath + fileName].join('') : fileName;
	};

	// Set templates
	this.templates = config.templates || {};
	var templates = {
		rootDir: config.templates && config.templates.rootDir ? config.templates.rootDir : 'object/'
		, list: config.templates && config.templates.list ? config.templates.list : 'list'
		, form: config.templates && config.templates.form ? config.templates.form : 'form'
		, details: config.templates && config.templates.details ? config.templates.details : 'details'
	};
	this.templates = {
		rootDir: templates.rootDir
		, list: constructFilePath(templates.rootDir, templates.list)
		, form: constructFilePath(templates.rootDir, templates.form)
		, details: constructFilePath(templates.rootDir, templates.details)
	};
		
	// Set route base uri
	this.routeBaseUri = config.routeBaseUri || '/objects/';

	// Set routes to customly provided routes or default ones
	this.routes = {
		list: (config.routes && config.routes.list) ? config.routes.list : [VERBS.GET, [this.routeBaseUri, _routes.list]]
		, createForm: (config.routes && config.routes.createForm) ? config.routes.createForm : [VERBS.GET, [this.routeBaseUri+'form/',  _routes.form]]
		, updateForm: (config.routes && config.routes.updateForm) ? config.routes.updateForm: [VERBS.GET, [this.routeBaseUri+'form/:slug', _routes.form]]
		, details: (config.routes && config.routes.details) ? config.routes.details : [VERBS.GET, [this.routeBaseUri+':slug', _routes.details]]
		, update: (config.routes && config.routes.update) ? config.routes.update : [VERBS.PUT, [this.routeBaseUri, _routes.update]]
		, create: (config.routes && config.routes.create) ? config.routes.create : [VERBS.POST, [this.routeBaseUri, _routes.create]]
		, delete: (config.routes && config.routes.delete) ? config.routes.delete : [VERBS.GET, [this.routeBaseUri+':slug/delete', _routes.delete]]
	};


	// Register routes (custom or default ones)
	this.mapRoutes();
};

// Maps the <routes> property into application routes.
CRUDRouter.prototype.mapRoutes = function(){
	var self = this, verb, args, routeConfiguration, r_args;

	Object.keys(this.routes).forEach(function(routeKey, routeConfiguratio, routes) {
		routeConfiguration = self.routes[routeKey];
		if (routeConfiguration) {
			verb = routeConfiguration[0];
			args = routeConfiguration[1];
			r_args = [verb].concat([].slice.call(args));
			self.app._router.route.apply(self.app._router, r_args);
		}
	});
};


exports.CRUDRouter = CRUDRouter;