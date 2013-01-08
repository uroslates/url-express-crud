var AbstractResourceController = require('./abstract').AbstractResourceController;


	// BaseResourceController class implements <AbstractResrouceController>'s interface.
	// This is a base resources CRUD controller class.
	// Constructor arguments
	//
	// @param conf - JSON configuration object
	//
	// {
	//
	//		// REQUIRED: Resource provider instance
	//		// (@extends <AbstractResourceProvider>)
	//		resourceProvider: new MongooseResourceProvider({
	//			model: Item
	//		})
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
var BaseResourceController = function(conf) {
	// assert expected
	if (!conf || !conf.hasOwnProperty('resourceProvider') || !conf.resourceProvider) {
		throw new Error('<BaseResourceController configuration requires <resourceProvider> parameter to be set!');
	}

	// ResourceProvider instance, used internally. It is expected to implement CRUD DAO for the Resource that the controller is made for.
	this.resourceProvider = conf.resourceProvider;
	this.resourceRequestParamName = conf.resourceRequestParamName || "object";
	this.resourceRequestParamNamePlural = conf.resourceRequestParamNamePlural || "object_list";
};

// Extends <AbstractResrouceController> class (conforms to its interface)
BaseResourceController.prototype = Object.create(AbstractResourceController);

// <AbstractResourceController> interface implementation
BaseResourceController.prototype = {

	// @see AbstractResourceController.list()
	list: function(req, res, next) {
		var args = Array.prototype.slice.call(arguments, 3);
		this.resourceProvider.find.apply(this.resourceProvider, args);
	}

	// @see AbstractResourceController.details()
	, details: function(req, res, next) {
		var args = Array.prototype.slice.call(arguments, 3);
		this.resourceProvider.findOne.apply(this.resourceProvider, args);
	}
	
	// @see AbstractResourceController.create()
	, create: function(req, res, next) {
		var args = Array.prototype.slice.call(arguments, 3)
			, resourceJson = req.body[this.resourceRequestParamName];
		// prepend resource to be saved to the arguments array
		args.unshift(resourceJson);
		this.resourceProvider.save.apply(this.resourceProvider, args);
	}
	
	// @see AbstractResourceController.update()
	, update: function(req, res, next) {
		var args = Array.prototype.slice.call(arguments, 3);
		this.resourceProvider.update.apply(this.resourceProvider, args);
	}
	
	// @see AbstractResourceController.delete()
	, delete: function(req, res, next) {
		var args = Array.prototype.slice.call(arguments, 3);
		this.resourceProvider.delete.apply(this.resourceProvider, args);
	}

};


exports.BaseResourceController = BaseResourceController;