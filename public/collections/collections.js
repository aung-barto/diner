var DishesCol = Backbone.Collection.extend({
	model: Dish,
	url: '/dishes'
});

var dishes = new DishesCol();

var Categories = Backbone.Collection.extend({
	model: Category,
	url: '/categories'
});

var categories = new Categories();

// var breakfast = new Categories();
// var lunch = new Categories();
// var dinner = new Categories();
// var dessert = new Categories();
// var appetizer = new Categories();