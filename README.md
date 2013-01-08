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



## Author

[Uroš Lates](http://uroslates.com)