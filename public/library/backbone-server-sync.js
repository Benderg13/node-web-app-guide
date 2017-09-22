var Backbone = require('backbone')

var syncWithServer = function(method, collection){
	var syncFunction = function(callback){
		var options = {
			success: callback
		}
		Backbone.sync(method, collection, options)
	}

	return syncFunction
}

module.exports = syncWithServer