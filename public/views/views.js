
var ShowCatView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#showCategories').html()),
	events: {
		'click button.editCat': 'editCat',
		'click button.updateCat': 'updateCat',
		'click button.removeCat': 'removeCat'
	},

	updateCat: function(){
		var updateCatName = this.$('#updateCatName' + this.model.id).val();

		this.model.set({
			name: updateCatName
		});

		this.model.save();
		console.log('Category Saved');
		$('span.editCatForm').hide();
	},

	editCat: function(){
		$('span.category' + this.model.id).remove();
		$('span.editCatForm' + this.model.id).show();
	},

	removeCat: function(){
		this.model.destroy();
	},

	render: function(){
		this.$el.html(this.template({category: this.model.toJSON()}));
		return this;
	}
});

var AllCatView = Backbone.View.extend({
	el: 'ul.catList',
	template: _.template($('#showCategories').html()),
	initialize: function(){
		this.listenTo(this.collection, "sync remove", this.render);
	},

	render: function(){
		$('#newDish').html('');
		var categories = this;
		categories.$el.html('');
		categories.collection.each(function(category){
			categories.$el.append(new ShowCatView({model: category}).render().$el);
			// categories.$el.append(categories.template({category: category.toJSON()}));
		});
		return this;
	}
});

var AddCatView = Backbone.View.extend({
	el: '.addCatForm',
	template: _.template($('#addCatForm').html()),
	events: {
		'click button.addCatButt': 'addCategory'
	},
	render: function(){
		$('addCatForm').html('');
		$('.addCat').html(''); //
		this.$el.html(this.template());
		return this;
	},

	addCategory: function(){

		var catNameField = $('#newCatName');
		var catName = catNameField.val();

		this.collection.create({
			name: catName
		});

		catNameField.val('');

	}
});

/////<<<<------INDIVIDUAL CATEGORY------->>>>/////////////
var CategoryView = Backbone.View.extend({
	el: '.oneCatList',
	template: _.template($('#oneCategory').html()),
	initialize: function(){
		this.listenTo(this.collection, "sync remove", this.render);
	},

	render: function(){
		var groupDishes = this.collection.toJSON());
		// this.$el.html(this.template({category: this.collection.toJSON()}));

		var dishes = this.$el;
		dishes.html('');
		this.collection.each(function(dish){
			dishes.append(new ShowCatView({model: dish}).render().$el);
		});
		return this;
	}
});

////////<<<<-------DISHES------->>>>//////////////////////
var ShowDishView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#showDishes').html()),
	events: {
		'click button.editDish': 'editDish',
		'click button.updateDish': 'updateDish',
		'click button.removeDish': 'removeDish' 
	},

	updateDish: function(){
		var updateName = this.$('#newName' + this.model.id).val();
		var updateThai = this.$('#newThaiName' + this.model.id).val();
		var updateTranslation = this.$('#newTrans' + this.model.id).val();
		var updateSpicy = this.$('#newSpiciness' + this.model.id).val();
		var updatePrice = this.$('#newPrice' + this.model.id).val();
		var updateImage = this.$('#newImage' + this.model.id).val();

		this.model.set({
			name: updateName,
			thai_name: updateThai,
			translation: updateTranslation,
			image_url: updateImage,
			price: updatePrice,
			spicy: updateSpicy,
		});

		this.model.save();
		console.log("Dish saved");
		$('span.editForm'+this.model.id).hide();
	},
	
	editDish: function(){
		$('span.dish'+this.model.id).remove();
		$('span.editForm'+this.model.id).show();
	},

	removeDish: function(){
		this.model.destroy();
	},

	render: function(){
		// console.log(this.model);
		this.$el.html(this.template({dish: this.model.toJSON()}));
		return this;
	}
})

var AllDishView = Backbone.View.extend({
	el: 'ul.dishes',
	template: _.template($('#showDishes').html()),
	initialize: function(){
		this.listenTo(this.collection, "sync remove", this.render);
	},

	render: function(){
		$('.catList').html('');
		$('a#newCat').html('');
		var dishes = this;
		dishes.$el.html('');
		dishes.collection.each(function(dish){
			dishes.$el.append(new ShowDishView({model: dish}).render().$el);
		});
		return this;
	}
});

var AddDishView = Backbone.View.extend({
	//add dish form renders here
	el: 'div.addDish',
	template: _.template($('#addDishForm').html()),
	events: {'click button.add': 'addDish'},
	render: function(){
		this.$el.html(this.template());
		return this;
	},
	//render add dish form
	addDish: function(){
		var nameField = this.$('#newName');
		var thaiField = this.$('#newThaiName');
		var transField = this.$('#newTranslation');
		var spicyField = this.$('#spiciness');
		var priceField = this.$('#newPrice');
		var categoryField = this.$('#categoryId');
		var imageField = this.$('#newImage');
		var name = nameField.val();
		var thai = thaiField.val();
		var translation = transField.val();
		var spiciness = spicyField.val();
		var price = priceField.val();
		var category = categoryField.val();
		var imageLink = imageField.val();
		// console.log(thai);
		this.collection.create({
			name: name,
			thai_name: thai,
			translation: translation,
			image_url: imageLink,
			price: price,
			spicy: spiciness,
			category_id: category
		});

		nameField.val('');
		thaiField.val('');
		transField.val('');
		spicyField.val('');
		priceField.val('');
		categoryField.val('');
		imageField.val('');
	}
});