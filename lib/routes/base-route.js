var Controller = require('../controllers/base').BaseResourceController
	, MongooseResourceProvider = require('../providers/mongoose').MongooseResourceProvider;


// <BaseRoute> generator function.
// This function returns base CRUD route object.
// Constructor arguments
//
// @param context - context in which the function operates. Corresponds to <CRUDRouter>
//
// @param conf - JSON configuration object
//
// {
//
//		// REQUIRED: Resource instance to be used
//		// (@extends <AbstractResourceControllerl> class instace
//		controller: @extends <AbstractResourceControllerl>
//
//		// Name to be used for storing resource
//		// within the template context (locals)
//		, resourceRequestParamName: 'movie'
//
//		// Name to be used for resource collection template
//		// context variable, within the resource list template
//		, resourceRequestParamNamePlural: 'movies'
//
// }
//
// @author <a href="http://uroslates.com/contact/">Uroš Lates</a>
var BaseRoute = function(context, conf) {
		var crudrouter = context;

		// assert required
		if (arguments.length > 1) {
			if (!conf.controller) {
				throw new Error('BaseRoute() <conf.controller> is required parameter!');
			}

			// Set controller to custom controller or default one
			crudrouter.controller = conf.controller;
		}

		return {
			list: function(req, res, next){
				var listCallback = function(err, items){
						res.format({
							html: function() {
								var locals = {};
								locals[crudrouter.controller.resourceRequestParamNamePlural] = items;
								// TODO: make this configurable via configuration parameter
								locals['title'] = 'Items';
								res.render(crudrouter.templates.list, locals);
							}
							, json: function() {
								res.json(items);
							}
						});
					}
					, providerArgs = [{}, listCallback]
					, args = Array.prototype.slice.call(arguments).concat(providerArgs);

				crudrouter.controller.list.apply(crudrouter.controller, args);
			}

			, details: function(req, res, next) {
				var detailsCallback = function(err, item){
						var locals = {};
						locals[crudrouter.controller.resourceRequestParamName] = item;
						locals.title = item.name;
						res.format({
							html: function() {
								res.render(crudrouter.templates.details, locals);
							}
							, json: function() {
								res.json(item);
							}
						});
					}
					, providerArgs = [{slug: req.params.slug}, detailsCallback]
					, args = Array.prototype.slice.call(arguments).concat(providerArgs);

				crudrouter.controller.details.apply(crudrouter.controller, args);
			}

			, form: function(req, res, next) {
				var locals = {};
				if (!req.params.slug) {
					locals.title = 'Create Item';
					item = new crudrouter.Model();
					locals[crudrouter.controller.resourceRequestParamName] = item;

					res.render(crudrouter.templates.form, locals);
				} else {
					var detailsCallback = function(err, item){
							locals.title = item._id ? 'Edit Item' : 'Create Item';
							locals[crudrouter.controller.resourceRequestParamName] = item;

							res.render(crudrouter.templates.form, locals);
						}
						, providerArgs = [{slug: req.params.slug}, detailsCallback]
						, args = Array.prototype.slice.call(arguments).concat(providerArgs);

					crudrouter.controller.details.apply(crudrouter.controller, args);
				}
			}

			, update: function(req, res, next) {
				var updateCallback = function(err, item){
						if (err) {
							console.log('updateRoute ERROR: ', err);
							res.render('/form/'+req.body.item.slug, req.body);
						} else {
							res.redirect(crudrouter.routeBaseUri+item.slug);
						}
					}
					, objCtxName = crudrouter.controller.resourceRequestParamName
					, providerArgs = [{_id: req.body[objCtxName]._id}, req.body[objCtxName], updateCallback]
					, args = Array.prototype.slice.call(arguments).concat(providerArgs);
				
				crudrouter.controller.update.apply(crudrouter.controller, args);
			}

			, create: function(req, res, next) {
				var createCallback = function(err, items){
						if (err) {
							req.body.error = 'Your message has errors:';
							req.body.errors = [err.message];
							req.body[token] = res.body[_csrf];
							res.render(crudrouter.templates.form, req.body);
						} else {
							res.redirect(crudrouter.routeBaseUri);
						}
					}
					, providerArgs = [createCallback]
					, args = Array.prototype.slice.call(arguments).concat(providerArgs);
				
				crudrouter.controller.create.apply(crudrouter.controller, args);
			}

			, delete: function(req, res, next) {
				var deleteCallback = function(err, items){
						res.redirect(crudrouter.routeBaseUri);
					}
					, providerArgs = [{slug: req.params.slug}, deleteCallback]
					, args = Array.prototype.slice.call(arguments).concat(providerArgs);
				
				crudrouter.controller.delete.apply(crudrouter.controller, args);
			}

			, csrf: function(req, res, next) {
				res.locals.token = req.session._csrf;
				next();
			}
		};
	};

exports = module.exports = BaseRoute;