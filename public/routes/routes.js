var CatRoutes = Backbone.Router.extend({
	routes: {
		'categories': 'allCategories',
		// 'categories/new': 'addCategories'
	},

	allCategories: function(){
		console.log("all categories");
		categories.fetch({
			success: function(model, response){
				console.log(response);
				console.log({collection: categories});
				new AllCatView({collection: categories}).render();

			}
		});
	}

	// addCategories: function(){
	// 	new AddCatView({collection: categories}).render();
	// }
});

var DishRoutes = Backbone.Router.extend({
	routes: {
		'dishes':'allDishes',
		'dishes/new': 'addDish'
	},

	allDishes: function(){
		console.log("alldish");
		dishes.fetch({
			success: function(model, response){
				new AllDishView({collection: dishes}).render();
			}
		});
	},

	addDish: function(){
		new AddDishView({collection: dishes}).render();
	}

	// showDish: function(id){
	// 	console.log("hello");
	// 	var span = $('.dish'+id); 
	// 	console.log(span);
 //        span.html('');
	// 	var thisDish = new Dish({id:id});
	// 	thisDish.fetch({
	// 		success: function(){
	// 			console.log(thisDish);
	// 			new ShowDishView({model: thisDish}).render();
	// 		}
	// 	});
	// }
});

var categoryRoutes = new CatRoutes();
var dishRoutes = new DishRoutes();
Backbone.history.start();

