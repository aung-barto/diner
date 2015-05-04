var CatRoutes = Backbone.Router.extend({
	routes: {
		'categories': 'allCategories',
		'categories/new': 'addCategories',
		// 'categories/:id/dishes': 'showCategory'
	},

	allCategories: function(){
		categories.fetch({
			success: function(model, response){
				// console.log(response);
				// console.log({collection: categories});
				new AllCatView({collection: categories}).render();
			}
		});
	},

	addCategories: function(){
		new AddCatView({collection: categories}).render();
	},

	// showCategory: function(){
	// 	var thisCategory = new Category({id:id}); 
	// 	thisCategory.fetch({
	// 		success: function(){
	// 			new ShowCatView({model: thisCategory}).render();
	// 		}
	// 	});
	// }
});

var DishRoutes = Backbone.Router.extend({
	routes: {
		'dishes':'allDishes',
		'dishes/new': 'addDish'
	},

	allDishes: function(){
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

var CatNDishRoutes = Backbone.Router.extend({
	routes: {
		'categories/:id': 'showCategory'
	},

	showCategory: function(id){
		var catDishes = new Category({id:id}); 
		catDishes.fetch({
			success: function(){
				console.log(thisCategory);
				new CategoryView({model: thisCategory}).render();
			}
		});
		catDishes.fetch({
			data: {category_id: id}, 
			success: function(model, response){
				// console.log(catDishes);
				new CategoryView({collection: catDishes}).render();
			}
		});
	}
});

var catNDishRoutes = new CatNDishRoutes();
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