var Backbone = require('backbone')
var TodoItemsView = require('../views/todo-items')
var TodoItemView = require('../views/todo-item')

var Router = Backbone.Router.extend({
	routes: {
		'todoItems': 'todoItems',
		'todoItem/:id': 'todoItem',
		'*default': 'todoItems'
	},

	initialize: function(app){
		this.app = app
	},

	todoItems: function(){
		var view = new TodoItemsView({ collection: this.app.collection })
		this.showView(view)
	},

	todoItem: function(id){
		var todoItem = this.app.collection.get(id)
		var view = new TodoItemView({ model: todoItem })
		this.showView(view)
	},

	showView: function(view){
		var renderedView = view.render().el
		var $viewContainer = this.app.$('#main')
		$viewContainer.html(renderedView)
	}
})

module.exports = Router
