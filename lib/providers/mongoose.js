
var AbstractResourceProvider = require('./abstract').AbstractResourceProvider;

// MongooseResourceProvider class, implementation of <AbstractResourceProvider> interface for Mongoose library.

// Its used to create provide consistent API that uses Mongoose ORM for data retrieval.
// Delegates all calls to Mongoose.

// Constructor arugments:
//
// @param config - JSON configuration
//
// {
//
//		// <Mongoose.Model> class type
//		Model: require('mongoose').model('XXX')
//
// }

// @author <a href="http://uroslates.com/contact/">Uroš Lates</a>
MongooseResourceProvider = function(config) {
	if (!config || !config.hasOwnProperty('Model') || !config.Model) {
		throw new Error('MongooseResourceProvider configuration requires a parameter <Model>!');
	}
	this.Model = config.Model;
};

// Extends AbstractResrouceController class (conforms to its API)
MongooseResourceProvider.prototype = AbstractResourceProvider;

// <AbstractResourceController> interface implementation
MongooseResourceProvider.prototype = {

	// Retrieves all the records that conform to the provided query.
	//
	// @see http://mongoosejs.com/docs/api.html#model_Model-find
	//		Model.find(conditions, [fields], [options], [callback])
	find: function(conditions, fields, options, callback) {
		this.Model.find.apply(this.Model, arguments);
	}

	// Retrieves record based on its <id>.
	//
	// @see http://mongoosejs.com/docs/api.html#model_Model-findById
	//		Model.findById(id, [fields], [options], [callback])
	, findById: function(id, fields, options, callback) {
		this.Model.findById.apply(this.Model, arguments);
	}

	// Retrieves record based on condition object supplied.
	//
	// @see http://mongoosejs.com/docs/api.html#model_Model-findOne
	//		Model.findOne(conditions, [fields], [options], [callback])
	, findOne: function(fields, options, callback) {
		this.Model.findOne.apply(this.Model, arguments);
	}

	// Saves an instance.
	//
	// @see http://mongoosejs.com/docs/api.html#model_Model-save
	//		Model#save([fn])
	, save: function(resourceJson, fn) {
		var args = Array.prototype.slice(arguments, 1)
			, resource = new this.Model(resourceJson);

		if (resource.isNew) {
			delete resourceJson._id;
			this.Model.create(resourceJson, fn);
		}
	}


	// @see http://mongoosejs.com/docs/api.html#model_Model-update
	//		Model.findByIdAndUpdate(id, [update], [options], [callback])
	, update: function(conditions, update, options, callback) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = args[0]._id;
		if (args.length > 2) {
			delete args[1]._id;
		}
		this.Model.findByIdAndUpdate.apply(this.Model, args);
	}

	// @see http://mongoosejs.com/docs/api.html#model_Model-findOneAndRemove
	//		Model.findOneAndRemove(conditions, [options], [callback])
	, delete: function(conditions, options, callback) {
		this.Model.findOneAndRemove.apply(this.Model, arguments);
	}

};


exports.MongooseResourceProvider = MongooseResourceProvider;