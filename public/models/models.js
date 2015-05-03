var Dish = Backbone.Model.extend({
	urlRoot: '/dishes',
	initialize: function(){
		console.log('New dish created!');
		this.on('change', function(){
			console.log('Change that dish');
		});
	}
});

var Category = Backbone.Model.extend({
	urlRoot: '/categories',
	initialize: function(){
		console.log('New category created!');
		this.on('change', function(){
			console.log('Change category');
		});
	}
});