var Backbone = require('backbone')

var TodoItem = Backbone.Model.extend({
	idAttribute: '$loki',

	defaults: {
		text: 'New todo item.'
	},

	sync: require('../library/backbone-loki-sync')
})

module.exports = TodoItem
