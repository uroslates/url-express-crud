// AbstractResourceProvider class.

// This class itention is to be a resource provider.
// It is aware of the resource used. It knows how to
// provide a resrouce from the storage.

// Acts as a DAO layer used to provide a data.

// General purpose of this class is to be overriden which enables
// the clients to easely hook in their own DAO implementation.

// It abstracts the concrete database related intactions and
// forces the clients to encapsulate them within the subclasses.

// @author <a href="http://uroslates.com/contact/">Uroš Lates</a>
var AbstractResourceProvider = {

	find: function() {
		throw new Error('Method not implemented!');
	}

	, findOne: function(options, callback) {
		throw new Error('Method not implemented!');
	}

	, save: function() {
		throw new Error('Method not implemented!');
	}

	, update: function() {
		throw new Error('Method not implemented!');
	}

	// Delegates call to save or update method depending on the <Resource.id>.
	// Expects that first argument is the resource id (cause id can belong to
	// properties that are inconsistently named among different databases e.g. _id/id...)
	// remaining arguments should correspond to the save/update method signatures!
	, saveOrUpdate: function(resource_id) {
		if (!resource_id) {
			save.apply(this, arguments);
		} else {
			update.apply(this, arguments);
		}
	}

	, delete: function() {
		throw new Error('Method not implemented!');
	}

};

exports.AbstractResourceProvider = AbstractResourceProvider;