# url-express-crud Project

This project is aimed to helps developers exposing (having out of box created) basic CRUD actions for their models(resource) in express.js based applications.



## Usage

* Install the project by adding it as a dependency within your project's package configuration file.
* Require the library component.
* Expose basic CRUD operations for your Models (for now only Mongoose models are supported out of box):  
		var productCrudRoutes = new crud.CRUDRouter({  
  			app: app  
  			, Model: mongoose.model('Product')  
		};  
* To use different persistence strategy, you have to configure your own custom **resource providers** as described in an example application [url-express-crud-example](https://github.com/uroslates/url-express-crud-example).



## Examples

To see an example usage for this (url-express-crud) library check out this repo:  
	* [url-express-crud-example](https://github.com/uroslates/url-express-crud-example)
	
The repo above is demoing the basic usage of **url-express-crud** library.

More information about the library and how to use it can be found on [Uroš Lates's blog](http://uroslates.wordpress.com/).



## Usefull Links

* [url-express-crud](https://github.com/uroslates/url-express-crud) - library's source code.  
	* [documented code](http://uroslates.github.com/url-express-crud/docs/url-express-crud.html) - library's documented source code.
* [url-express-crud](https://npmjs.org/package/url-express-crud) - on npm registry
* [url-express-crud-example](https://github.com/uroslates/url-express-crud-example) - example application using the library.
* [Blog post](http://uroslates.wordpress.com/2013/01/08/url-express-crud-library/) describing the library.



## Author

[Uroš Lates](http://uroslates.com)