var Backbone = require('backbone')

var ToDoItem = Backbone.View.extend({
	template: require('../templates/todo-item.hbs'),

	events: {
		'submit': 'save',
		'click #delete': 'delete',
		'click #cancel': 'cancel'
	},

	render: function(){
		this.setElement(this.template(this.model.toJSON()))
		return this
	},

	save: function(){
		var text = this.$('#todo-item-text').val()
		this.model.set('text', text)
		this.model.save()
		Backbone.history.navigate('#/todoItems', true)
		return false
	},

	delete: function(){
		this.model.destroy()
		Backbone.history.navigate('#/todoItems', true)
	},

	cancel: function(event){
		Backbone.history.navigate('#/todoItems', true)
	}
})

module.exports = ToDoItem
