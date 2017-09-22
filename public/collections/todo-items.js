var Backbone = require('backbone')
var syncWithServer = require('../library/backbone-server-sync')

var TodoItems = Backbone.Collection.extend({
	name: 'todoItems',

	model: require('../models/todo-item'),

	sync: require('../library/backbone-loki-sync'),

	url: '/todoItems',

	initialize: function(){
		this.syncToServer = syncWithServer('create', this),

		this.syncFromServer = syncWithServer('read', this)
	}
})

module.exports = TodoItems
