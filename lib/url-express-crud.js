var AbstractResourceProvider = require('./providers/abstract').AbstractResourceProvider
	, MongooseResourceProvider = require('./providers/mongoose').MongooseResourceProvider
	, AbstractController = require('./controllers/abstract').AbstractResourceController
	, BaseResourceController = require('./controllers/base').BaseResourceController
	, CRUDRouter = require('./routes/route').CRUDRouter;


exports = module.exports = {
	// providers
	AbstractResourceProvider: AbstractResourceProvider
	, MongooseResourceProvider: MongooseResourceProvider
	// controllers
	, AbstractController: AbstractController
	, BaseResourceController: BaseResourceController
	// routers
	, CRUDRouter: CRUDRouter
};