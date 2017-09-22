var Backbone = require('backbone')
var listItemTemplate = require('../templates/list-item.hbs')
var TodoItemModel = require('../models/todo-item')

var ToDoItems = Backbone.View.extend({
	template: require('../templates/todo-items.hbs'),

	events: {
		'click #add': 'add',
		'click #sync-to-server': 'syncToServer',
		'click #sync-from-server': 'syncFromServer'
	},

	initialize: function(){
		this.collection.on('update', this.renderListItems.bind(this))
	},

	render: function(){
		this.setElement(this.template())
		this.renderListItems()
		return this
	},

	renderListItems: function(){
		var $listGroup = this.$('.list-group')
		$listGroup.html('')
		this.collection.forEach(function(todoItem){
			var renderedListItem = listItemTemplate(todoItem.toJSON())
			$listGroup.append(renderedListItem)
		})
	},

	add: function(){
		var todoItem = new TodoItemModel
		this.collection.create(todoItem)
	},

	syncToServer: function(){
		this.collection.syncToServer()
	},

	syncFromServer: function(){
		// destroy all existing todo items in database
		var todoItemsArray = this.collection.toArray()
		for(var i = 0; i < todoItemsArray.length; i++){
			todoItemsArray[i].destroy()
		}

		// add all
		var self = this
		this.collection.syncFromServer(function(collection){
			self.collection.reset()
			collection.forEach(function(todoItem){
				self.collection.create(todoItem)
			})
		})
	}
})

module.exports = ToDoItems
