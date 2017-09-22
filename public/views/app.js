var Backbone = require('backbone')
var Router = require('../routers/router')
var TodoItemsCollection = require('../collections/todo-items')

var App = Backbone.View.extend({
	template: require('../templates/app.hbs'),

	initialize: function(){
		this.collection = new TodoItemsCollection()
		this.collection.fetch()
	},

	render: function(options){
		this.setElement(this.template(options))
		this.router = new Router(this)
		Backbone.history.start()
		return this
	}
})

module.exports = App
