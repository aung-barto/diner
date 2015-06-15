var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("db/diner.db");
var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(express.static('public'));
app.get('/', function(req, res){
	res.render('index.html')
});

app.get('/categories', function(req, res){
	db.all("SELECT * FROM categories", function(err, rows){
		if(err){
			throw err;
		}
		res.json(rows);
	});
});

app.get('/categories/:id', function(req, res){
	// db.get('SELECT * FROM categories WHERE id = ?', req.params.id, function(err, row){
	// 	if(err){
	// 		throw err;
	// 	}
	console.log(req.params.id);
		db.all('SELECT * FROM dishes INNER JOIN categories ON dishes.category_id = categories.id WHERE category_id = ?;',req.params.id, function(err, rows){
			if(err){
				throw err;
			}
			console.log(rows);
			res.json(rows);
		});
	// });
});

app.post('/categories', function(req, res){
	db.run("INSERT INTO categories (category_name) VALUES (?)", req.body.category_name, function(err,row){
		if(err){
			throw err;
		}
		var id = this.lastID;
        db.get("SELECT * FROM categories WHERE id = ?", id, function(err, row) {
        	if(err) {
        		throw err;
        	}
        	res.json(row);
        });
    });
});

app.put('/categories/:id', function(req, res){
	var id = req.params.id
	db.run("UPDATE categories SET category_name = ? WHERE id = ?", req.body.category_name, id, function(err){
		if(err){
			throw err;
		}
		db.get("SELECT * FROM categories WHERE id = ?", id, function(err, row){
			if(err){
				throw err;
			}
			res.json(row);
		});
	});
});

app.delete('/categories/:id', function(req, res){
	db.run("DELETE FROM categories WHERE id = ?", req.params.id, function(err){
		if(err){
			throw err;
		}
		res.json({deleted: true});
	});
});


app.get('/dishes', function(req, res) {
	db.all("SELECT * FROM dishes", function(err, rows) {
		if(err) {
			throw err;
		}
		res.json(rows);
	});
});

app.get('/dishes/:id', function(req, res) {
	db.get("SELECT * FROM dishes WHERE id = ?", req.params.id, function(err, row){
		if(err) {
			throw err;
		}
		res.json(row);
	});
});

app.post('/dishes', function(req, res) {
	console.log(req.body);
	db.run("INSERT INTO dishes (name, thai_name, translation, image_url, price, spicy, category_id) VALUES (?,?,?,?,?,?,?)", req.body.name, req.body.thai_name, req.body.translation, req.body.image_url, req.body.price, req.body.spicy, req.body.category_id, function(err) {
		if(err) {
			throw err;
		}
    var id = this.lastID;
    db.get("SELECT * FROM dishes WHERE id = ?", id, function(err, row) {
    	if(err) {
    		throw err;
    	}
    	res.json(row);
    });
  });
});

app.put('/dishes/:id', function(req, res) {
	var id = req.params.id;
	db.run("UPDATE dishes SET name = ?, thai_name = ?, translation = ?, image_url = ?, price = ?, spicy = ?, category_id = ? WHERE id = ?", req.body.name, req.body.thai_name, req.body.translation, req.body.image_url, req.body.price, req.body.spicy, req.body.category_id, id, function (err) {
		if(err) {
			throw err;
		}
		db.get("SELECT * FROM dishes WHERE id = ?", id, function(err, row) {
			if(err) {
				throw err;
			}
			res.json(row);
		});
	});
});

app.delete('/dishes/:id', function(req, res) {
	db.run("DELETE FROM dishes WHERE id = ?", req.params.id, function(err) {
		if(err) {
			throw err;
		}
		res.json({deleted: true});
	});
});


app.listen(1234);
console.log('Listening on port 1234');
