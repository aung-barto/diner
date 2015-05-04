var CatRoutes = Backbone.Router.extend({
	routes: {
		'categories': 'allCategories',
		'categories/new': 'addCategories'
	},

	allCategories: function(){
		categories.fetch({
			success: function(model, response){
				console.log(response);
				console.log({collection: categories});
				new AllCatView({collection: categories}).render();
			}
		});
	},

	addCategories: function(){
		new AddCatView({collection: categories}).render();
	}

});

var DishRoutes = Backbone.Router.extend({
	routes: {
		'dishes':'allDishes',
		'dishes/new': 'addDish'
	},

	allDishes: function(){
		// $('.catsRender').remove();
		dishes.fetch({
			success: function(model, response){
				new AllDishView({collection: dishes}).render();
			}
		});
	},

	addDish: function(){
		new AddDishView({collection: dishes}).render();
	}

});

var categoryRoutes = new CatRoutes();
var dishRoutes = new DishRoutes();
Backbone.history.start();

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
	
