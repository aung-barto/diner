var DishRoutes = Backbone.Router.extend({
	routes: {
		'dishes':'allDishes',
		'dishes/new': 'addDish',
		'dishes/:id': 'editDish'
	},

	allDishes: function(){
		dishes.fetch({
			success: function(model, response){
				new AllDishView({collection: breakfast}).render();
			}
		});
	},

	addDish: function(){
		new AddDishView({collection: breakfast}).render();
	},

});

var dishRoutes = new DishRoutes();
Backbone.history.start();