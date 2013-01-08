var BaseRoute = require('../lib/routes/base-route')
	, mongoose = require('mongoose');

 // Database
mongoose.connect('mongodb://localhost/express_crud__test');

var TestSchema = new mongoose.Schema({
		title: { type: String, default: '' }
	})
	, TestModel = mongoose.model('Test', TestSchema);

var testArgs = {
	Model: TestModel
};


describe("BaseRoute class API", function() {

	it('expects <BaseRoute> class constructor to require some arguments', function(){
		expect(function() { new BaseRoute(); }).toThrow();
	});

	it('expects <BaseRoute> class to expose correct API interface', function(){
		br = new BaseRoute(testArgs);

		expect(br).toBeDefined();
		expect(br.list).toBeDefined();
		expect(br.details).toBeDefined();
		expect(br.form).toBeDefined();
		expect(br.update).toBeDefined();
		expect(br.create).toBeDefined();
		expect(br.delete).toBeDefined();

		expect(br.controller).toBeDefined();
	});

	
	describe ("<BaseRoute.list> method", function() {

		it('expects <BaseRoute.list> method to be called', function(){
			var listSpy = spyOn(br.controller, 'list').andCallFake();

			br = new BaseRoute(testArgs);
			br.list();
		});



	});

});