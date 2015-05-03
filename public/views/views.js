
// var CategoryView = Backbone.View.extend({
// 	el: 'ul.categories',
// 	template: _.template($('#showCategories').html),
// 	initialize: function(){
// 		this.listenTo(this.collection, "sync", this.render);
// 	},

// 	render: function(){
// 		var category = this;
// 		category.$el.html('');
// 		category.collection
// 	}
// })


var AllDishView = Backbone.View.extend({
	el: 'ul.dishes',
	template: _.template($('#showDishes').html()),
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
	},

	events: {
		'click button.editDish': 'editDish',
		'click button.updateDish': 'updateDish',
		'click button.removeDish': 'removeDish' 
	},

	removeDish: function(){
		this.model.destroy();
	},

	updateDish: function(){
		var newName = this.$('#newName' + this.model.id).val();
		var newThai = this.$('#newThaiName' + this.model.id).val();
		var newTranslation = this.$('#newTranslation' + this.model.id).val();
		var newSpicy = this.$('#spiciness' + this.model.id).val();
		var newPrice = this.$('#newPrice' + this.model.id).val();
		var newCat = this.$('#categoryId' + this.model.id).val();
		var newImage = this.$('#newImage' + this.model.id).val();

		this.model.set({
			name: newName,
			thai_name: newThai,
			translation: newTranslation,
			image_url: newImage,
			price: newPrice,
			spicy: newSpicy,
			category_id: newCat
		});

		this.model.save();
	},

	editDish: function(){
		this.$('span.dish').('');
		this.$('span.editForm').show();
	},

	render: function(){
		var dishes = this;
		dishes.$el.html('');
		dishes.collection.each(function(dish){
			dishes.$el.append(dishes.template({dish: dish.toJSON()}));
			return this;
		});
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
		console.log(thai);
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