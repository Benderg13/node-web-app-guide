var Backbone = require('backbone')
var Express = require('express')
var TodoItems = require('../public/collections/todo-items')

var todoItems = function(){
	var router = Express.Router()

	router.get('/', function(req, res, next){
		var todoItems = new TodoItems
		todoItems.fetch()
		todoItems = todoItems.toJSON()

		// extract only the 'text' property of each todo item object
		todoItems = todoItems.map(function(todoItem){
			return { text: todoItem.text }
		})

		res.json(todoItems)
	})

	router.post('/', function(req, res, next){
		var todoItems = new TodoItems
		todoItems.fetch()

		// destroy all existing todo items in database
		var todoItemsArray = todoItems.toArray()
		for(var i = 0; i < todoItemsArray.length; i++){
			todoItemsArray[i].destroy()
		}

		// extract only the 'text' property of each todo item object
		req.body = req.body.map(function(todoItem){
			return { text: todoItem.text }
		})

		// add all todo items to database
		req.body.forEach(function(todoItem){
			todoItems.create(todoItem)
		})

		res.sendStatus(200)
	})

	return router
}

module.exports = todoItems