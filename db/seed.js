var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('diner.db');

db.run('INSERT INTO categories (category_name) VALUES (?)', 'Breakfast', function(err){
	if(err){
		throw err;
	}
});

db.run('INSERT INTO dishes (name, thai_name, translation, image_url, price, spicy, category_id) VALUES (?,?,?,?,?,?,?)', 'Joke', 'โจ๊ก', 'Congee Porridge', 'http://www.eatingthaifood.com/wp-content/uploads/2012/01/thai-breafast-congee.jpg', 7, 0, 1, function(err){
	if(err){
		throw err;
	}
});