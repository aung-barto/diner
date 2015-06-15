# Thainer

Thainer is a SPA Thai restaurant menu built with Express, SQLite3 and Backbone. This project focuses on the front end and user interaction with menu viewing for client side and ability to edit dishes, categories and prices by the site's admin.

####Specs:
- Users/Admin should see a lit of categories that are served at the restaurant.
- Admin can create, update and remove price, image, and name and category of dishes. (No authentication at the moment)
- Users can view changes to the menu right away without reloading.
- Users can click on a dish name to see what each dish looks like. 
- Also provided are the dishes translations accompanied by their pronunciations.

#####Side Notes:
- For how simple this application is there's probably no need for Backbone routes, but this is my first time using it so I wanted to learn how it works. I created routes for dishes and categories.
- Dish and Category are not nested inside each other. They are fetched separately since each dish already has a category_id.

You can view the site here:
[Thainer](http://104.236.106.226:1234/)

