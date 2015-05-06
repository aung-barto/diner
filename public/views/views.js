

var OpeningView = Backbone.View.extend({
	el: '.open',
	template: _.template($('#cover').html()),
	render: function(){
		$('.background').hide();
		$('.coverImage').show();
		$('.links').hide();
		$('#newCat').hide();
		$('#newDish').hide();
		this.$el.html(this.template());
		return this;
	}
});

var AllCatView = Backbone.View.extend({
	el: 'ul.catList',
	// template: _.template($('#showCategories').html()),
	initialize: function(){
		//listening to categories and dishes
		this.listenTo(this.collection, "sync remove", this.render);
		this.listenToOnce(dishes, "sync remove");
	},

		//rendering just categories
	render: function(){
		//hide Add New Dish link and form
		$('.coverImage').hide();
		$('.open').html('');
		$('.links').show();
		$('.addDish').hide();
		$('.dishes').html('');
		// //show Add New Category link and form
		$('.background').show();
		$('#newCat').show();
		$('.addCatForm').show();

		var categories = this.$el;
		categories.html('');
		this.collection.each(function(category){
			categories.append(new CategoryView({model: category}).render().$el);
			//KEEP JUST IN CASE
			// categories.append(this.template({category: category.toJSON()}));
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
		//hide Add New Category link and form
		$('.addCatForm').html('');
		$('.addCat').html(''); 
		this.$el.html(this.template());
		return this;
	},
	//grab updated info here
	addCategory: function(){
		$('.addCat').hide();
		var catNameField = $('#newCatName');
		var catName = catNameField.val();

		this.collection.create({
			category_name: catName
		});

		catNameField.val('');
	}
});

/////<<<<------INDIVIDUAL CATEGORY------->>>>/////////////
var CategoryView = Backbone.View.extend({
	tagName: 'div',
	template1: _.template($('#oneCategory').html()),
	// template2: _.template($('#manyDishes').html()),
	// initialize: function(){
		// this.listenTo(this.collection, "sync remove", this.render);
	// },

	events: {
		'click button.editCat': 'editCat',
		'click button.updateCat': 'updateCat',
		'click button.removeCat': 'removeCat',
		'click a': 'showD',
		'click .lockLock': 'toggleUnLock',
		'click .unlock': 'toggleLock' 
	},

	updateCat: function(){
		var updateCatName = this.$('#updateCatName' + this.model.id).val();

		this.model.set({
			category_name: updateCatName
		});

		this.model.save();
		console.log('Category Saved');
		$('span.editCatForm').hide();
	},

	editCat: function(){
		$('span.oneCat' + this.model.id).remove();
		$('span.editCatForm' + this.model.id).show();
	},

	removeCat: function(){
		this.model.destroy();
	},

	showD: function(){
		$('#show'+this.model.id).toggle();
	},

	toggleUnLock: function(){
		$('.lockLock').toggleClass('unlock');
		$('.editCat').show();
		$('.removeCat').show();
	},

	toggleLock: function(){
		$('.unLock').toggleClass('lockLock');
		$('.editCat').hide();
		$('.removeCat').hide();
	},

	render: function(){
		console.log("category view render");

		//rendering individual category, grabbing their category_id
		this.$el.html(this.template1({category: this.model.toJSON()}));
		// console.log(this.model.id);

		//looping through each dishes to find match to category_id
		var $ul = $('<ul>').attr('id','show' + this.model.id).attr('style', 'display: none');

		// var elem = document.querySelector('.draggable');
		// var draggie = new Draggabilly('.draggable');
		// $('.showCat').'click'(function(){
		// });
		dishes.each(function(item){
			console.log(item.attributes.spicy);
			if(item.attributes.category_id === this.model.id){
				//adding matched showDishView to ul
				$ul.append(new ShowDishView({model: item}).render().$el) ;
			}
		}.bind(this));

		//add ul to div element to render
		this.$el.append($ul);
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
		'click button.removeDish': 'removeDish',
		'click .lockLock': 'toggleUnLock',
		'click .unlock': 'toggleLock',
		'click .dishName': 'imagePopUp',
		'click .imageLo': 'imageHide'
	},
	//grab updated info from text fields
	updateDish: function(){
		var updateName = this.$('#newName' + this.model.id).val();
		var updateThai = this.$('#newThaiName' + this.model.id).val();
		var updateTranslation = this.$('#newTrans' + this.model.id).val();
		var updateSpicy = this.$('#newSpiciness' + this.model.id).val();
		var updatePrice = this.$('#newPrice' + this.model.id).val();
		var updateImage = this.$('#newImage' + this.model.id).val();
		var updateCategory = this.$('#newCategory' + this.model.id).val();

		this.model.set({
			name: updateName,
			thai_name: updateThai,
			translation: updateTranslation,
			image_url: updateImage,
			price: updatePrice,
			spicy: updateSpicy,
			category_id: updateCategory
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

	toggleUnLock: function(){
		$('.lockLock').toggleClass('unlock');
		$('.editDish').show();
		$('.removeDish').show();
	},

	toggleLock: function(){
		$('.unLock').toggleClass('lockLock');
		$('.editDish').hide();
		$('.removeDish').hide();
	},

	imagePopUp: function(){
		$('.dishImage'+ this.model.id).toggle();
	},

	imageHide: function(){
		$('.dishImage' + this.model.id).hide();
	},

	render: function(){
		// console.log(this.model.toJSON().image_url);
		this.$el.html(this.template({dish: this.model.toJSON()}));
		return this;
	}
});

var AllDishView = Backbone.View.extend({
	el: 'ul.dishes',
	template: _.template($('#showDishes').html()),
	initialize: function(){
		this.listenTo(this.collection, "sync remove", this.render);
	},

	render: function(){
		$('.catList').html('');
		//hide category related stuff
		$('a#newCat').hide();
		$('.addCatForm').hide();
		$('#newDish').show();
		$('.addDish').show();
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
		// console.log(this.collection);
		// var groupDish = this.collection.toJSON();

		// this.$el.html('');
		// // $('.addDish').html('');
		// Object.keys(groupDish).forEach(function(item){
		// 	this.$el.append(this.template2({category: this.model, category_dish: groupDish[item]}));
		// }.bind(this));