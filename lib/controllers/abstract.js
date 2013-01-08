/*
	AbstractResourceController - base abstract class.

	All CRUD controllers should implement its interface.

	@author <a href="http://uroslates.com/contact/">Uroš Lates</a>
*/
var AbstractResourceController = {
	
	/*
		List function is responsible for proving list of configured resources.
		Note: Resrouces to be retrieved are configured via resourceProvider property.

		@param req - request object
		@param res - response object
		@param next - next route function in execution chain
		@param ... - remaining parameters are those that will be used as an arguments
			for the <resourceProvider.find> function call! Order is important!
	*/
	list: function(req, res) {
		throw new Error('Method not implemented');
	}

	/*
		Details function is responsible for proving details for the resources..

		@param req - request object
		@param res - response object
		@param next - next route function in execution chain
		@param ... - remaining parameters are those that will be used as an arguments
			for the <resourceProvider.findOne> function call! Their order is important!
	*/
	, details: function() {
		throw new Error('Method not implemented');
	}
	
	/*
		Create funcion (POST-ing resource instance).
		Stores the resource (resource submitted via form) in the database.

		@param req - request object
		@param res - response object
		@param next - next route function in execution chain
		@param ... - remaining parameters are those that will be used as an arguments
			for the <resourceProvider.save> function call! Their order is important!
	*/
	, create: function() {
		throw new Error('Method not implemented');
	}
	
	/*
		Update funcion (PUT-ing [existing] resource instance).
		Stores the resource (resource submitted via form) in the database.

		@param req - request object
		@param res - response object
		@param next - next route function in execution chain
		@param ... - remaining parameters are those that will be used as an arguments
			for the <resourceProvider.update> function call! Their order is important!
	*/
	, update: function() {
		throw new Error('Method not implemented');
	}
	
	/*
		Delete funcion (DELETE-ing [existing] resource instance).
		Deletes the resource from the database.

		@param req - request object
		@param res - response object
		@param next - next route function in execution chain
		@param ... - remaining parameters are those that will be used as an arguments
			for the <resourceProvider.delete> function call! Their order is important!
	*/
	, delete: function() {
		throw new Error('Method not implemented');
	}

};

exports.AbstractResourceController = AbstractResourceController;